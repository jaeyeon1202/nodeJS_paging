const dao = require("../database/pageDAO");

const pageOperation = (start, totalCounter) => {
    let page = {};
    const pageNum = 3; //페이지당 보여줄 개수
    const num = (totalCounter % pageNum === 0)?0:1 ;
    page.totPage = parseInt(totalCounter / pageNum) + num;
    page.startNum = (start-1) * pageNum +1;
    page.endNum = start * pageNum;
    return page;
}

const pageRead = { 
    //해당하는 페이지를 읽어오는 기능
    //하나의 데이터도, 목록도 다 리드로 처리

    list : async (start, totalC) => {
        start = (start && start>=1)?Number(start):1;
        const page = pageOperation(start, totalC);
        /*
        if(start && start>=1)
            start=Number(start)
        else
            start=1;
        */
            const list = await dao.daoRead.list(page.startNum, page.endNum);
        console.log("service(서비스) :", list);

        data ={};
        data.page = page;
        data.start = start;
        data.list = list.rows;
        console.log("data: ", data);

        return data; //데이터만 리턴으로 돌려주갰다
    },

    content : async (num) =>{
        pageUpdate.upHit(num); //페이지번호를 증가시킴
        const data = await dao.daoRead.content(num);
        return data.rows[0];
    },

    totalContent : async () =>{
        const totalContent = await dao.daoRead.totalContent();
        console.log( totalContent );
        return totalContent.rows[0]['COUNT(*)'];
    }

}

const pageUpdate = {
    upHit : ( num ) =>{
        dao.daoUpdate.upHit(num);
    }
}

const pageInsert = {
    write : async ( body ) =>{
        const result = await dao.daoInsert.write( body );
    }
}


    
module.exports= {pageRead, pageInsert}