function dragStart(e){



    var target = e.target;
    var fromResult = 'true';
    var audio_container = target.firstElementChild;
    var audio = audio_container.firstElementChild;
    var audio_source = audio.firstElementChild;
    var source = audio_source.getAttribute('src');
    var meta = target.lastElementChild;
    var speaker = meta.firstElementChild.innerHTML;
    var trans = meta.lastElementChild.innerHTML;
    e.dataTransfer.setData('result_audio', source);
    e.dataTransfer.setData('result_speaker', speaker);
    e.dataTransfer.setData('result_trans', trans);
    e.dataTransfer.setData('fromResult', fromResult);

}

function cellDrag(e){

    var fromResult = 'false';
    var $target = e.target;
    var audio = $(this).children()[0].getAttribute('src');
    var speaker = $(this).children()[1].innerHTML;
    var transcription = $(this).children()[2].innerHTML;
    e.dataTransfer.setData('audio', audio);
    e.dataTransfer.setData('speaker', speaker);
    e.dataTransfer.setData('transcription', transcription);
    e.dataTransfer.setData('fromResult', fromResult);
    $target.innerHTML = '';

}



function dropped(e){

    //Determine if the result object came from a cell

    var fromResult = e.dataTransfer.getData('fromResult');

    if (fromResult == 'false'){  //FromCell

        var target = e.target;
        if (target.firstChild) {
                target.removeChild(target.firstChild);
                target.innerHTML = '';
               }


        var audio_src = e.dataTransfer.getData('audio');
        var speaker = e.dataTransfer.getData('speaker');
        var trans = e.dataTransfer.getData('transcription');
        var x = document.createElement("audio");
        var y = document.createElement('p');
        var z = document.createElement('p');
        x.setAttribute("src", audio_src);
        x.setAttribute('id','audio');
        x.setAttribute('class', 'audio_drop');
        y.setAttribute('class','speaker_text');
        y.innerHTML = speaker;
        z.innerHTML = trans;
        z.setAttribute('class','transcripted_text');
        $(this).append(x);
        $(this).append(y);
        $(this).append(z);

    } else {

        //Determine if the result came from a search result object

        //From Result
        e.preventDefault();
        var target = e.target;
        if (target.getAttribute("class") === 'cell'){

            if (target.firstChild) {
                target.removeChild(target.firstChild);
                target.innerHTML = '';
               }

            var data = e.dataTransfer.getData('result_audio');
            var speaker = e.dataTransfer.getData('result_speaker');
            var trans = e.dataTransfer.getData('result_trans');
            var x = document.createElement("AUDIO");
            var y = document.createElement('p');
            var z = document.createElement('p');
            x.setAttribute("src", data);
            x.setAttribute('id','audio');
            x.setAttribute('class', 'audio_drop');
            y.setAttribute('class','speaker_text');
            y.innerHTML = speaker.slice(8);
            z.innerHTML = trans.slice(0,100);
            z.setAttribute('class','transcripted_text');
            target.appendChild(x);
            target.appendChild(y);
            target.appendChild(z);



            }

        };



} //End drop function




function clickme(e){

    var results = document.getElementsByClassName('search_result');
}


function doFirst(){

    var button = document.getElementById('bttn');
    var theGrid = document.getElementById('main_grid');
    var theParent = document.getElementById("results_container");
    var cells = document.getElementsByClassName('cell');
    for (i = 0; i < cells.length; i++){
        cells[i].setAttribute('draggable','true');
        cells[i].addEventListener("dragstart", cellDrag, false);
        cells[i].addEventListener("drop", dropped, false);

        }
    button.addEventListener("click", clickme, false);
    theParent.addEventListener("dragstart", dragStart, false);
    theGrid.addEventListener("dragenter", function(e){e.preventDefault();}, false);
    theGrid.addEventListener("dragover", function(e){e.preventDefault();}, false);


    }



window.addEventListener("load", doFirst, false);