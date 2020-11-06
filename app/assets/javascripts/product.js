
//画像投稿
$(document).on('turbolinks:load', ()=> {
  const buildFileField = (num)=> {
    const html = `<div data-index="${num}" class="js-file_group">
                    <input class="js-file" type="file"
                    name="product[images_attributes][${num}][image]"
                    id="product_images_attributes_${num}_image"><br>
                    <div class="js-remove">削除</div>
                  </div>`;
    return html;
  }
  const buildImg = (index, url)=> {
    const html = `<img data-index="${index}" src="${url}" width="100px" height="100px">`;
    return html;
  }

  let fileIndex = [1,2,3,4,5,6,7,8,9,10];
  lastIndex = $('.js-file_group:last').data('index');
  fileIndex.splice(0, lastIndex);



  $('.image-box').on('change', '.js-file', function(e) {
    const targetIndex = $(this).parent().data('index');
    // ファイルのブラウザ上でのURLを取得する
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);
    // 該当indexを持つimgタグがあれば取得して変数imgに入れる(画像変更の処理)
    if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
      img.setAttribute('image', blobUrl);
    } else {  // 新規画像追加の処理
      $('.previews').append(buildImg(targetIndex, blobUrl));
      // fileIndexの先頭の数字を使ってinputを作る
      $('.image-box').append(buildFileField(fileIndex[0]));
      fileIndex.shift();
      // 末尾の数に1足した数を追加する
      fileIndex.push(fileIndex[fileIndex.length - 1] + 1)
    }
  });

  $('.image-box').on('click', '.js-remove', function() {
    $(this).parent().remove();
    if ($('.js-file').length == 0) $('.image-box').append(buildFileField(fileIndex[0]));
    $(`img[data-index="${targetIndex}"]`).remove();
    
  });
  //手数料計算
  $('.input-price-box').on('input',function(){
    let tax = $('.input-price-box').val();
    if (tax < 300){
      $('.fee').text("ー");
      $('.profit').text("ー");
    } else{
      $('.fee').text("¥" + Math.floor(tax * 0.1).toLocaleString());
      $('.profit').text("¥" + Math.ceil(tax - (tax * 0.1)).toLocaleString());
    }
  });
});