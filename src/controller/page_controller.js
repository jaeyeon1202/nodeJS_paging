const service = require("../service/page_service");

const views = {
    index : (req, res)=>{
        res.render("index");
    },
    
    list : async (req,res) => { //이 함수는 비동기 함수가 있습니다.
        console.log("start: ", req.query.start); //스타트라는 변수에 들어오는 페이지를 보여줌
        const totalContent = await service.pageRead.totalContent();
        const data = await service.pageRead.list(req.query.start, totalContent);

        res.render("list", {list:data.list, totalContent, 
                        start:data.start, page:data.page});
    },

    writeForm : (req,res)=>{


        res.render("write_form");
    },
    content : async (req, res) =>{
        //글을 클릭하면 글에 대한 벊호가 나와
        const data = await service.pageRead.content(req.params.num);
        res.render("content", { data })
    }
}
const process = {
    write : async (req, res)=>{
        const msg = await service.pageInsert.write( req.body ); //post방식
        res.redirect("/page/list");
    }
}
    
module.exports = { views, process };