function doFirst(){

    var button = document.getElementById('bttn');
    var theGrid = document.getElementById('main_grid');
    var theParent = document.getElementById("results_container");
    var cells = document.getElementsByClassName('cell');

    for (i = 0; i < cells.length; i++){
        cells[i].setAttribute('draggable','true');
        cells[i].addEventListener("dragstart", cellDrag, false);
        cells[i].addEventListener("drop", dropped, false);
        cells[i].children[1].addEventListener("drop", result2cell, false);
        }

    theParent.addEventListener("dragstart", dragStart, false);
    theGrid.addEventListener("dragenter", function(e){e.preventDefault();}, false);
    theGrid.addEventListener("dragover", function(e){e.preventDefault();}, false);


    }



window.addEventListener("load", doFirst, false);






function dragStart(e){



    var target = e.target;
    var fromResult = 'true';
    var audio_container = target.children[0];
    var audio = audio_container.firstElementChild;
    var audio_source = audio.firstElementChild;
    var source = audio_source.getAttribute('src');
    var meta = target.children[1];
    var speaker = meta.firstElementChild.innerHTML;
    var trans = meta.lastElementChild.innerHTML;
    e.dataTransfer.setData('result_audio', source);
    e.dataTransfer.setData('result_speaker', speaker);
    e.dataTransfer.setData('result_trans', trans);
    e.dataTransfer.setData('fromResult', fromResult);

}

function cellDrag(e){



    var fromResult = 'false';
    var audio = $(this)[0].childNodes[2].getAttribute('src');
    var transcription = $(this).children()[1].innerHTML;
    var speaker = $(this).children()[0].innerHTML;
    e.dataTransfer.setData('audio', audio);
    e.dataTransfer.setData('speaker', speaker);
    e.dataTransfer.setData('transcription', transcription);
    e.dataTransfer.setData('fromResult', fromResult);
    $(this)[0].childNodes[0].innerHTML = ''
    $(this).children()[1].innerHTML = ''
    $(this)[0].childNodes[2].remove()

}


function result2cell(e){ //Drag a result object to an already populated cell

    var cell = $(this).parent();
    cell_top = cell[0].childNodes[0];
    cell_bottom = cell[0].childNodes[1];
    if (cell[0].childNodes[0].innerHTML === '') {
                //Empty
               } else {
                cell[0].childNodes[0].innerHTML = ''
                cell[0].childNodes[1].innerHTML = ''
                cell[0].childNodes[2].remove();

               }
    var data = e.dataTransfer.getData('result_audio');
    var speaker = e.dataTransfer.getData('result_speaker');
    var trans = e.dataTransfer.getData('result_trans');

    var x = document.createElement("AUDIO");
    var d = document.createElement('p').innerHTML = speaker
    var t = document.createElement('p').innerHTML = trans
    x.setAttribute("src", data);
    x.setAttribute('id','audio');
    x.setAttribute('class', 'audio_drop');
    t = t.slice(0,90);

            //z.innerHTML = trans.slice(0,90);
            //z.setAttribute('class','transcripted_text');

     cell.append(x);
     cell_bottom.append(t);
     cell_top.append(d);
}


function dropped(e){

    //Determine if the result object came from a cell

    var fromResult = e.dataTransfer.getData('fromResult');

    if (fromResult == 'false'){  //FromCell

        cell_top = $(this)[0].childNodes[0];
        cell_bottom = $(this)[0].childNodes[1];
        $(this)[0].childNodes[2].remove();


        if ($(this)[0].childNodes[0].innerHTML === '') {
                console.log('cell is empty');
               } else {
                $(this)[0].childNodes[0].innerHTML = ''
                $(this)[0].childNodes[1].innerHTML = ''
                $(this)[0].childNodes[2].remove();

               }

        var audio_src = e.dataTransfer.getData('audio');
        var speaker = e.dataTransfer.getData('speaker');
        var trans = e.dataTransfer.getData('transcription');
        var x = document.createElement("audio");
        var y = document.createElement('p').innerHTML = speaker;
        var z = document.createElement('p').innerHTML = trans;
        x.setAttribute("src", audio_src);
        x.setAttribute('id','audio');
        x.setAttribute('class', 'audio_drop');
        cell_top.append(y);
        cell_bottom.append(z);
        $(this)[0].append(x);



    } else {

        //Determine if the result came from a search result object

        //From Result
        e.preventDefault();
        var target = e.target;

        if (target.getAttribute("class") === 'cell'){
            var cell_top = target.children[0];
            var cell_bottom = target.children[1];

            if (cell_top.firstChild) {
                cell_top.firstChild.innerHTML = ''
                cell_bottom.firstChild.innerHTML ='';
               }

            var data = e.dataTransfer.getData('result_audio');
            var speaker = e.dataTransfer.getData('result_speaker');
            var trans = e.dataTransfer.getData('result_trans');
            var x = document.createElement("AUDIO");
            var d = document.createElement('p').innerHTML = speaker
            var t = document.createElement('p').innerHTML = trans
            x.setAttribute("src", data);
            x.setAttribute('id','audio');
            x.setAttribute('class', 'audio_drop');
            t = t.slice(0,90);

            //z.innerHTML = trans.slice(0,90);
            //z.setAttribute('class','transcripted_text');

            target.appendChild(x);
            cell_bottom.append(t);
            cell_top.append(d);

            }

        };



} //End drop function






