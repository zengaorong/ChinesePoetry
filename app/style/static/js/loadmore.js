var loadmore_data ={
    setdata : function (data) {
        this.data = data;
    }
};


// 请求的商家类型
var load_type = "";
// 是否还有商家能加载
var loading_end = false;
// 记录父类的临时id
var temp_parent_id = "";
// 用于避免鼠标同一变化而多次调用函数
var old_key = 0;
// 排序类型 人气排序 评价排序等
var rank_tpye = 0;
// 加载的模板
var _template = [
    '{{#prop}}',
    '<div class="common-list-item clearfix" >',
    '                                <a class="list-item-pic grey" href="{{url}}" target="_blank" data-reactid="168">',
    '                                    <span data-reactid="169">{{index}}</span>',
    '                                    <div data-reactid="170">',
    '                                        <img src="{{image}}" class="image" data-reactid="171">',
    '                                    </div>',
    '                                </a>',
    '                                <div class="list-item-desc" data-reactid="172">',
    '                                    <div class="list-item-desc-top" data-reactid="173">',
    '                                        <a href="{{url}}" target="_blank" class="item-title" data-reactid="174">{{title}}</a>',
    '                                            <div class="item-eval-info clearfix" data-reactid="175">',
    '',
    '',
    '                                                <div class="rate-stars" data-reactid="176">',
    '                                                    <ul class="rate-stars-ul rate-stars-dark" data-reactid="177">',
    '                                                        <li data-reactid="178" style="font-size: 0;">',
    '                                                            <i class="iconTag icon-star" data-reactid="179"></i>',
    '                                                        </li>',
    '                                                        <li data-reactid="180" style="font-size: 0;">',
    '                                                            <i class="iconTag icon-star" data-reactid="181"></i>',
    '                                                        </li>',
    '                                                        <li data-reactid="182" style="font-size: 0;">',
    '                                                            <i class="iconTag icon-star" data-reactid="183"></i>',
    '                                                        </li>',
    '                                                        <li data-reactid="184" style="font-size: 0;"><i class="iconTag icon-star" data-reactid="185"></i>',
    '                                                        </li>',
    '                                                        <li data-reactid="186" style="font-size: 0;"><i class="iconTag icon-star" data-reactid="187"></i>',
    '                                                        </li>',
    '                                                    </ul>',
    '                                                    <ul class="rate-stars-ul rate-stars-dark rate-stars-light" style="width:{{start}}%" data-reactid="188">',
    '                                                        <li data-reactid="189" style="font-size: 0;">',
    '                                                            <i class="iconTag icon-star-light" data-reactid="190"></i>',
    '                                                        </li><li data-reactid="191" style="font-size: 0;"><i class="iconTag icon-star-light" data-reactid="192"></i>',
    '                                                    </li><li data-reactid="193" style="font-size: 0;"><i class="iconTag icon-star-light" data-reactid="194"></i>',
    '                                                    </li><li data-reactid="195" style="font-size: 0;"><i class="iconTag icon-star-light" data-reactid="196"></i>',
    '                                                    </li><li data-reactid="197" style="font-size: 0;"><i class="iconTag icon-star-light" data-reactid="198"></i>',
    '                                                    </li>',
    '                                                    </ul>',
    '                                                </div>',
    '                                                <span data-reactid="199"><!-- react-text: 200 -->{{goodstars}}<!-- /react-text --><!-- react-text: 201 -->分<!-- /react-text --></span>',
    '                                                <span class="highlight" data-reactid="202"><!-- react-text: 203 -->{{ratingnums}}<!-- /react-text --><!-- react-text: 204 -->人评论<!-- /react-text --></span>',
    '                                                ',
    '                                                </div>',
    '                                        <div class="item-site-info clearfix" data-reactid="208">',
    '                                            <span data-reactid="209">{{goodstypestr}}</span>',
    '                                            <span title="东湖区中山路282-284号二楼（原西湖商厦）" data-reactid="213">{{address}}</span>',
    '                                            <div class="item-site-map" data-reactid="214">',
    '                                                <span data-reactid="215"  onclick="addtest({{longitude}},{{latitude}})">查看地图</span>',
    '                                            </div>',
    '                                        </div>',
    '                                        <div class="item-price-info" data-reactid="216">',
    '                                            <span data-reactid="217">',
    '                                        </div>',
    '                                        <div class="list-item-tag" data-reactid="221">',
    '                                            <div class="tag-group tag-group-small border" data-reactid="222"></div>',
    '                                        </div>',
    '                                    </div>',
    '                                </div>',
    '                            </div>',
    '{{/prop}}',
].join('');

var _template_citys = [
    '{{#prop}}',
    '<div data-reactid="124"><a class="tag tag-expend tag-expend-town" href="javascript:void(0);" id = "parent_area_{{{id}}}" parent_area_id="{{{id}}}"><span data-reactid="126">{{name}}</span></a></div>',
    '{{/prop}}',
].join('');

var _template_change_area = [
    '                                    <div class="popover-content">',
    '                                        <a class="tag tag-empty tag-large" href="javascript:void(0);">',
    '                                       {{#parents_area_name}}',
    '                                           <span id="area_child_tag_name">{{name}}</span></a>',
    '                                       {{/parents_area_name}}',
    '                                           <div class="tag-group tag-group-expend" id = "tag-group-change">',
    '                                       {{#parents_area_id}}',
    '                                               <div><a class="tag tag-empty " city_town_id="{{{id}}}"  change_areaid="{{{id}}}" onclick="new_load3(this)""><span>全部</span></a></div>',
    '                                       {{/parents_area_id}}',
    '                                           {{#prop}}',
    '                                               <div><a class="tag tag-empty " city_town_id="{{{id}}}"  change_areaid="{{{change_areaid}}}" onclick="new_load3(this)"><span>{{name}}</span></a></div>',
    '                                           {{/prop}}',
    '                                        </div>',
    '                                    </div>',
].join('');


var parentIds = "";
var areaid = "";
var townid = "";
var areamap = "";
var citySiteAreaId = "";
var citySiteCategoryId = "";

// 加载数据 如果loading_type = ture 表示在原来的基础上加载
function addlist(loading_type) {
    Mustache.parse(_template);
    function data2Html(data) {
        data = data || [];
        var curSysAry = data.filter(function(s){ return s.isCurrent; });
        data.sort(function(a, b){ return a.sortOrder - b.sortOrder;});
        data = data.map(function(s, i){s.first = i == 0; return s});

        for(var i=0;i<businesslist.length;i++){

            // 首页 无区域
            if(areaid==""){
                if(businesslist[i].topnum==1){
                    businesslist[i].index = "推荐";
                }else{
                    businesslist[i].index = i+limit_begin+1;
                }
            }else{
                if(businesslist[i].topareanum==1){
                    businesslist[i].index = "推荐";
                }else{
                    businesslist[i].index = i+limit_begin+1;
                }
            }
            businesslist[i].url = urls+"?businessid="+ businesslist[i].id + ((citySiteAreaId!=null && citySiteAreaId!="") ? ("&cityId=" + citySiteAreaId) : "") + ((citySiteAreaId!=null && citySiteAreaId!="" && citySiteCategoryId!=null && citySiteCategoryId!="") ? ("&categoryId=" + citySiteCategoryId) : "");
            businesslist[i].start =  businesslist[i].goodstars*100/5 + 4;
            businesslist[i].image = pic_file + businesslist[i].image;
            businesslist[i].goodstars=businesslist[i].goodstars.toFixed(1);
        }
        return Mustache.render(_template, {prop: businesslist})
    }

    str_out = data2Html();
    // var htmls = ""
    //
    // var html ="<div class='common-list-item clearfix'>"+$(".common-list-item.clearfix").eq(0).html()+"</div>";
    // console.log(str_out)
    if(loading_type){
        $(".common-list-main").append(str_out);
    }else{
        $(".common-list-main").html(str_out);
    }
    if(businesslist.length<limit){
        loading_end = true
        $(".more-list p").html("没有更多了>>>").removeClass('more');
    }else {
        $(".more-list p").html("加载更多>>>").addClass('more');
    }
}

// 按照条件加载数据
function select_type(loading_type) {
    begin_num = {"limit_begin":limit_begin,"type":businesstpye,"businessType":good_type,"area.id":areaid,"area.parentIds":townid,"ranktype":rank_tpye};

    $.ajax({
        method:"get",
        url:"puhui/getbusList",
        async:true,
        data : begin_num,
        dataType:"json",
        layerIndex:-1,
        timeout : 10000,

        complete: function () {
            // console.log("我在完成时调用，虽然在before前");
            layer.close(this.layerIndex);
        },

        beforeSend:function () {
            // console.log("我在发送请求前调用")
            this.layerIndex = layer.load(0, { shade: [0.5, '#393D49']});
        },



        success:function(data){
            businesslist = data;
            addlist(loading_type);
        },
        error:function(){
            layer.alert('部分数据加载失败，可能会导致页面显示异常，请刷新后重试', {
                skin: 'layui-layer-molv'
                , closeBtn: 0
                , shift: 4 //动画类型
            });
            addlist(loading_type);
        }
    });
}


// 筛选条件 1 按照商家的类型选择
function new_load1(value){
    if($(value).attr('class').indexOf("tag-highlight")!=-1){
        $(".tag-empty-business").removeClass("tag-highlight");
        limit_begin = 0;
        businesslist = null;
        good_type = "";
        load_type = businesstpye+","+good_type;
        loading_end = false;
        $(".more-list p").html("加载更多>>>").addClass('more');
    }else {
        $("#tag_all_1").attr({'class':'tag tag-large'});
        $(".tag-empty-business").removeClass("tag-highlight");
        $(value).attr({'class':'tag tag-empty tag-empty-business  tag-highlight'});
        // console.log($(value).attr('bus-type'))
        limit_begin = 0;
        businesslist = null;
        good_type = $(value).attr('bus-type');
        load_type = businesstpye+","+good_type;
        loading_end = false;
        $(".more-list p").html("加载更多>>>").addClass('more');
    }
    // begin_num = {"limit_begin":limit_begin,"businesstpye":load_type},
    select_type(false)
}

// 筛选条件 2 按照商家的区域选择
function new_load2(value){
    areaid = "";
    townid = "";
    limit_begin = 0;
    businesslist = null;
    loading_end = false;
    if($(value).attr('class').indexOf("tag-highlight")!=-1){
        $(".tag-empty-area").removeClass("tag-highlight");
        $(".more-list p").html("加载更多>>>").addClass('more');
    }else {
        $("#tag_all_2").attr({'class':'tag tag-large'});
        $(".tag-empty-area").removeClass("tag-highlight");
        $(value).attr({'class':'tag tag-empty tag-empty-area tag-highlight'});
        // console.log($(value).attr('bus-type'))
        areaid = $(value).attr('areaid');
        townid = areaid;
        temp_parent_id = areaid;
        $(".more-list p").html("加载更多>>>").addClass('more');
    }
    // begin_num = {"limit_begin":limit_begin,"businesstpye":load_type},
    child_area(areaid);
    select_type(false);
}

// 筛选条件 3 按照商家的子区域选择
function new_load3(value){
    areaid = "";
    townid = "";
    townid = $(value).attr('city_town_id');
    // console.log(townid)

    $(".tag-expend-town").removeClass("tag-highlight");
    $("#tag_all_3").attr({'class':'tag tag-large'});
    $("#parent_area_" + $(value).attr('change_areaid')).attr({'class':'tag tag-expend tag-expend-town tag-highlight'});
    if(townid!=$(value).attr('change_areaid')){
        $("#parent_area_" + $(value).attr('change_areaid')).html($(value).children('span').text());
    }else{
        $("#parent_area_" + $(value).attr('change_areaid')).html($("#area_child_tag_name").text());
    }
    areaid = townid;
    limit_begin = 0;
    businesslist = null;
    loading_end = false;
    $(".more-list p").html("加载更多>>>").addClass('more');
    select_type(false);
}

// 筛选条件 4 选择全部 添加红色的样式
function new_load4(value){
    // areaid = ""
    // townid = ""

    $(value).removeClass("tag tag-solid tag-large");
    $(value).attr({'class':'tag tag-solid tag-large'});

    if($(value).attr('tag_type')==1){
        good_type = "";
        $(".tag-empty-business").removeClass("tag-highlight");
    }
    if($(value).attr('tag_type')==2){
        areaid = "";
        townid = "";
        child_area(areaid);
        $(".tag-empty-area").removeClass("tag-highlight");
    }
    if($(value).attr('tag_type')==3){
        if(areaid==""){
            areaid = "";
            townid = "";
        }else{
            areaid = temp_parent_id;
            townid = temp_parent_id;
        }

        $(".tag-expend-town").removeClass("tag-highlight");
    }
    limit_begin = 0;
    businesslist = null;
    loading_end = false;
    select_type(false);
}


// 排序条件 "" null为不排序 "1" 按照人气排序 "2" 按照评价排序
function new_load5(value){
    // areaid = ""
    // townid = ""
    $(".tag-expend-rank").removeClass("tag-highlight");
    $(value).attr({'class':'tag tag-empty tag-expend-rank tag-highlight'});
    // console.log($(value).html());
    rank_tpye = 0;

    if($(value).attr('rank_type')==0){
        rank_tpye = 0;
    }
    if($(value).attr('rank_type')==1){
        rank_tpye = 1;
    }
    if($(value).attr('rank_type')==2){
        rank_tpye = 2;
    }
    // console.log($(value).attr('rank_type'))
    limit_begin = 0;
    businesslist = null;
    loading_end = false;
    select_type(false);
}



// ajax 请求区域
function child_area(areaid) {
    begin_num = {"cityid":areaid},
        $("#area_city_child").html('<p>加载中请等待</p>')
    $.ajax({
        method:"get",
        url:"puhui/data",
        async:true,
        data : begin_num,
        dataType:"json",
        success:function(data){
            areamap = data;
            // console.log(areamap)
            var parent_area_list = areamap['parent_area'];
            html_area_str = "";

            Mustache.parse(_template_citys);
            html_area_str = Mustache.render(_template_citys, {prop: parent_area_list});
            $("#area_city_child").html(html_area_str);




            $(".tag-expend").hover(function(){
                key_num = $(this).attr('parent_area_id')
                // console.log(key_num)
                if(old_key == key_num){
                    // console.log("ready")
                    $(".popover").css({"top":$(this)[0].offsetTop+27,"left":$(this)[0].offsetLeft,"display":"inline-block"});
                    return
                }else{
                    old_key = key_num;
                    // console.log(areamap['child_area'][old_key])
                    list_mustache_data = new Array;
                    var obj = new Object();
                    var list_nums = 0;
                    for(key in areamap['child_area'][old_key]){
                        // console.log(key + ":" + areamap['child_area'][old_key][key])
                        list_mustache_data[list_nums] = new Object();
                        list_mustache_data[list_nums].id = key;
                        list_mustache_data[list_nums].change_areaid = old_key;
                        list_mustache_data[list_nums].name = areamap['child_area'][old_key][key];
                        list_nums += 1
                    }
                    var city_town_name = ""
                    for(i=0;i<parent_area_list.length;i++){
                        if(parent_area_list[i].id==old_key){
                            city_town_name = parent_area_list[i].name;
                        }

                    }

                    // console.log(list_mustache_data)
                    Mustache.parse(_template_change_area);
                    html_area_str = Mustache.render(_template_change_area, {prop: list_mustache_data,parents_area_id:{id:old_key},parents_area_name:{name:city_town_name}});
                    $("#tag-group-change").html(html_area_str);
                }

                $(".popover").css({"top":$(this)[0].offsetTop+27,"left":$(this)[0].offsetLeft,"display":"inline-block"})
            },function(){
                $(".popover").hover(function(){

                },function(){
                    $(".popover").css({"display":"none"})
                });
            });



        },
        error:function(){
            alert("请求失败！");
            $("#area_city_child").html('<p>未加载到数据</p>>')
        }
    });

}



// 加载更多按钮 表示原来至少有一条数据
$(document).ready(function() {
    $(".more-list p").click(function(){
        if(loading_end){
            return;

        }
        limit_begin = limit_begin + limit;
        businesslist = null;
        load_type = businesstpye+","+good_type;
        select_type(true);
        // setTimeout(aaa,1000);
    });

});


// 下拉框 目前一开始并不加载 所以这个样式并没有作用 可能预先加载需要使用到
$(function(){
    $(".tag-expend").hover(function(){
        // console.log($(this)[0].offsetTop);
        $(".popover").css({"top":$(this)[0].offsetTop+27,"left":$(this)[0].offsetLeft,"display":"inline-block"})
    },function(){
        $(".popover").hover(function(){

        },function(){
            $(".popover").css({"display":"none"})
        });
    });
});





