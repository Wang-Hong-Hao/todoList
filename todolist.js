window.addEventListener('load', function () {
    var swiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
})





$(function () {
    // 先渲染li
    load();
    // 回车按下添加待办事项
    $('#title').on('keydown', function (e) {
        // 判断按下的是否是回车键
        if (e.keyCode === 13) {
            // 判断内容是否为空
            if ($(this).val() === "") {
                alert("请输入内容");
            } else {
                // 先获取本地存储
                var local = getDate();
                // 添加数据 以对象的形式
                local.push({
                    title: $(this).val(),
                    done: false
                });
                // 保存数据到本地存储
                saveDate(local);
                // 每次操作完成后进行加载
                load();
                // 输入框清空
                $(this).val('');
            }
        }
    })
    $('#btn').on('click', function () {
        if ($('#title').val() === "") {
            alert("请输入内容");
        } else {
            // 先获取本地存储
            var local = getDate();
            // 添加数据 以对象的形式
            local.push({
                title: $('#title').val(),
                done: false
            });
            // 保存数据到本地存储
            saveDate(local);
            // 每次操作完成后进行加载
            load();
            // 输入框清空
            $('#title').val('');
        }
    })
    // 删除按钮
    $('ul,ol').on('click', 'a', function () {
        // 获取本地存储
        var data = getDate();
        // 获取当前点击的a的索引号
        var index = $(this).attr('id');
        // 删除数据中对应索引号的数据
        data.splice(index, 1);
        // 保存数据
        saveDate(data);
        // 每次操作完成后进行加载
        load()
    })
    // 完成按钮
    $('ul,ol').on('click', 'input', function (i, ele) {
        // 获取本地存储
        var data = getDate();
        // 获取当前复选框这一行的a的索引号
        var index = $(this).siblings('a').attr('id');

        data[index].done = $(this).prop('checked');
        saveDate(data);
        load()
    })

    function getDate() {
        var data = localStorage.getItem('todolist');
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    function saveDate(data) {
        localStorage.setItem('todolist', JSON.stringify(data));
    }

    function load() {
        var todoCount = 0;
        var doneCount = 0;
        var data = getDate();
        $('ul,ol').empty();
        $.each(data, function (i, ele) {
            if (ele.done) {
                $('#donelist').append('<li><input type="checkbox" checked="checked"><p>' + ele.title + '</p><a href = "javascript:;" id = ' + i + '></a></li>');
                doneCount++;
            } else {
                $('#todolist').append('<li><input type="checkbox"><p>' + ele.title + '</p><a href = "javascript:;" id = ' + i + '></a></li>');
                todoCount++;
            }
        })
        $('#todocount').text(todoCount);
        $('#donecount').text(doneCount);
    }
})