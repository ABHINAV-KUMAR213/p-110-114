Webcam.set({
    width:350,
    height:300,
    img_format:'png',
    png_quality:90
});
camera = document.getElementById("camera");

Webcam.attach('#camera');
function takeSnapshot(){
    Webcam.snap (function(data_uri){
        document.getElementById("result").innerHTML = '<img src="'+data_uri+'" id="captured_image">';
    });
}
console.log('ml5.version:', ml5.version)
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/cKKTmZb1J/model.json',model_loaded);
function model_loaded (){
    console.log("model_loaded");
}
function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img,got_Result);
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "prediction 1 is " + prediction_1;
    speak_data_2 = " and prediction 2 is " + prediction_2;
    thisUtter = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    thisUtter.rate = 0.5;
    synth.speak(thisUtter);
}
function got_Result(error, results){
    if (error) {
        console.error(error);
    } else {
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML = results[0].label; 
        document.getElementById("result_emotion_name2").innerHTML = results[1].label; 
        prediction_1 =  results[0].label; 
        prediction_2 =  results[1].label; 
        speak();
            if (results[0].label == "happy"){
                document.getElementById("update_emoji").innerHTML = " 👍 ";
            }
            if (results[0].label == "sad"){
                document.getElementById("update_emoji").innerHTML = " 👌 ";
            }
            if (results[0].label == "angry"){
                document.getElementById("update_emoji").innerHTML = " 👎 ";
            }
             if (results[1].label == "happy"){
                document.getElementById("update_emoji2").innerHTML = " 👍 ";
            }
            if (results[1].label == "sad"){
                document.getElementById("update_emoji2").innerHTML = " 👌 ";
            }
            if (results[1].label == "angry"){
                document.getElementById("update_emoji2").innerHTML = " 👎 ";
            }
        }
    }
