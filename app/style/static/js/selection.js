
var load_type = "";
var temp_old_select = ""

// 筛选条件 1 按照商家的类型选择
function new_load1(value){
    console.log($(value).attr('class').indexOf("current-niandai")!=-1)
    if ($(value).attr('class').indexOf("current-niandai")!=-1){
        console.log("onclick is selected")
    }else {
            $("#tag_all_1").attr({'class':'tag tag-large'});
            $(".actortime").removeClass("current-niandai");
            $(value).attr({'class':'actortime current-niandai'});


        $.post("/poetry/actor",{
                data_put: $(value).text()
            },
            function(data,status){
                // var name = $.session.get('name');
                // console.log("name:::" + name);
                window.location.href = "../poetry/actor"
            });



    }


    // if($(value).attr('class').indexOf("tag-highlight")!=-1){
    //     $(".tag-empty-business").removeClass("tag-highlight");
    //     limit_begin = 0;
    //     businesslist = null;
    //     good_type = "";
    //     load_type = businesstpye+","+good_type;
    //     loading_end = false;
    //     $(".more-list p").html("加载更多>>>").addClass('more');
    // }else {
    //     $("#tag_all_1").attr({'class':'tag tag-large'});
    //     $(".tag-empty-business").removeClass("tag-highlight");
    //     $(value).attr({'class':'tag tag-empty tag-empty-business  tag-highlight'});
    //     // console.log($(value).attr('bus-type'))
    //     limit_begin = 0;
    //     businesslist = null;
    //     good_type = $(value).attr('bus-type');
    //     load_type = businesstpye+","+good_type;
    //     loading_end = false;
    //     $(".more-list p").html("加载更多>>>").addClass('more');
    // }
}