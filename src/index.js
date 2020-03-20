import * as cocoSsd from '@tensorflow-models/coco-ssd';

const button = document.getElementById('button'),
      input = document.getElementById('fileToUpload');

input.onchange = async e => {

  let tgt = e.target || window.event.srcElement,
      files = tgt.files;

  if (FileReader && files && files.length) {
    let fr = new FileReader();
    fr.onload = () => {
      document.getElementById('outImage').src = fr.result;
      
      let rotation = 0;
      document.getElementById('spinner').style.display = "inline-block";

      let timer = setInterval(() => {
        if (rotation == 350) {
            rotation = 5;
          } else {
            rotation += 5;
          }
        document.getElementById('spinner').style.transform = "rotate("+rotation+"deg)";
      }, 20);

      let image = new Image();
      image.src = fr.result;

      const imagePromise = new Promise( async (resolve, reject) => {

      let model = await cocoSsd.load(),
          predictions = await model.detect(image);

      resolve(predictions);

      }).then(res => {

        let str = 'In this picture: <br>';

        for (let obj of Object.entries(res)) {

          if (obj[1].score > 0.7) {
            str += obj[1].class + "<br>";
          }

        }

        document.getElementById('result').innerHTML = str;

        clearInterval(timer);
        document.getElementById('spinner').style.display = "none";

      }).catch(err => {
        console.log(err);
        clearInterval(timer);
        document.getElementById('spinner').style.display = "none";
      });

    }
    fr.readAsDataURL(files[0]);
  }

}