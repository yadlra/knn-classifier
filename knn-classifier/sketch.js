var model_mobilenet;
var video;
var classifier;
var exampleP, resultP;

// Change the value of these two variables to change the name of your custom classes
var className1 = "Class 1";
var className2 = "Class 2";
var className3 = "Class 3";


function setup() {
  // Initializing video
  video = createCapture(VIDEO);
  video.size(400, 300);
  video.hide();

  // Loading MobileNet
  mobilenet.load().then(modelLoaded);
  // Initializing a KNN Classifier
  classifier = knnClassifier.create();

  // User Interface
  createCanvas(400, 300);
  createButton("Add example for " + className1).mousePressed(btn0Clicked);
  createButton("Add example for " + className2).mousePressed(btn1Clicked);
  createButton("Add example for " +
className3).mousePressed(btn2Clicked);
  exampleP = createP();
  resultP = createP();
}

function draw() {
  image(video, 0, 0, 400, 300);

  // If there's at least one class, start prediction
  if (classifier.getNumClasses() > 0) {
    var inference = model_mobilenet.infer(video.elt);

    classifier.predictClass(inference).then(classifyDone);
  }
}

function classifyDone(result) {
  resultP.html("KNN has detected a " + result.label);
  // Have a look at the result object, you may find other usefull datas for your project!
  // print(result);
}

function btn0Clicked() {
  var inference = model_mobilenet.infer(video.elt);

  classifier.addExample(inference, className1);
  updateExampleText();
}

function btn1Clicked() {
  var inference = model_mobilenet.infer(video.elt);

  classifier.addExample(inference, className2);
  updateExampleText();
}

function btn2Clicked() {
  var inference = model_mobilenet.infer(video.elt);

  classifier.addExample(inference, className3);
  updateExampleText();
}

function modelLoaded(net) {
  model_mobilenet = net;
  print("Mobilenet is loaded");
}

function updateExampleText() {
  exampleP.html(
    "Examples for " + className1 + ": " +
    classifier.getClassExampleCount()[className1] +
    "<br>" +
    "Examples for " + className2 + ": " +
    classifier.getClassExampleCount()[className2] +
    "<br>" +
    "Examples for " + className2 + ": " +
    classifier.getClassExampleCount()[className2]
  );
}