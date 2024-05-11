const base = {
    get() {
        return {
            url : "http://localhost:8080/gouwushangcheng/",
            name: "gouwushangcheng",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/gouwushangcheng/front/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "购物商城小程序"
        } 
    }
}
export default base
