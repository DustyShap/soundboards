window.addEventListener("load", doFirst, false);


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





function dragStart(e){

    var target = e.target;
    var fromResult = 'true';
    var audio_container = target.children[0];
    var source = audio_container.children[2].children[0].getAttribute('src');
    var meta = target.children[1];
    var speaker = meta.firstElementChild.innerHTML;
    var trans = meta.lastElementChild.innerHTML;
    e.dataTransfer.setData('result_audio', source);
    e.dataTransfer.setData('result_speaker', speaker);
    e.dataTransfer.setData('result_trans', trans);
    e.dataTransfer.setData('fromResult', fromResult);
    }



function cellDrag(e){

    if ($(this)[0].children[1].innerHTML === ''){

          var fromResult = 'false';
          var is_blank = 'true';
          var is_blank = 'true';
          e.dataTransfer.setData('is_blank', is_blank);
          e.dataTransfer.setData('fromResult', fromResult);
    } else {

        //Cell is not empty!
        var is_blank = 'false';
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
        $(this)[0].childNodes[2].remove();
        e.dataTransfer.setData('is_blank',is_blank);
        $(this)[0].className = 'cell';
        $(this)[0].children[0].className = 'cell_top';

        }
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
     cell.append(x);
     cell_bottom.append(t);
     cell_top.append(d);
    }




function dropped(e){

    //Determine if the drag event object came from a cell
    var fromResult = e.dataTransfer.getData('fromResult');
    var is_blank = e.dataTransfer.getData('is_blank');

    if (fromResult == 'false'){
    //Checking to see if the object that was dragged was a result or not (in this case, it was from a cell)
       if (is_blank == 'false'){
        //Checking to see if the cell that was dragged was blank.  In this case, the cell was not blank

            cell_top = $(this)[0].childNodes[0];
            cell_bottom = $(this)[0].childNodes[1];
            cell = $(this)[0];
            cell.classList.add('cell_populated');
            cell_top.classList.add('populated');

            if ($(this)[0].childNodes[2]){
                $(this)[0].childNodes[2].remove();
                };

            if ($(this)[0].childNodes[0].innerHTML === '') {
                //Blank
                } else {
                    $(this)[0].childNodes[0].innerHTML = ''
                    $(this)[0].childNodes[1].innerHTML = ''
                    $(this)[0].childNodes[2].remove();
                };

            var audio_src = e.dataTransfer.getData('audio');
            var speaker = e.dataTransfer.getData('speaker');
            var trans = e.dataTransfer.getData('transcription');
            var x = document.createElement("audio");
            var y = document.createElement('p').innerHTML = speaker;
            var z = document.createElement('p').innerHTML = trans;
            x.setAttribute("src", audio_src);
            x.setAttribute('id','audio');
            x.setAttribute('class', 'audio_drop');
            cell_top.innerHTML = speaker;
            cell_bottom.innerHTML = trans;
            $(this)[0].append(x);
        } else {
        //Else would mean the cell that was dragged was in fact blank.
            if ($(this).children()[2]){
                $(this).children()[2].remove();
                $(this)[0].className = 'cell';
                $(this).children()[0].className = 'cell_top';
             }
        }

    } else {

        //Determine if the result came from a search result object
        //This event was dragged from a result object

        e.preventDefault();
        var target = e.target;

        if (target.getAttribute("class") === 'cell' || target.getAttribute("class") === 'cell_bottom'){

            var data = e.dataTransfer.getData('result_audio');
            var speaker = e.dataTransfer.getData('result_speaker');
            var trans = e.dataTransfer.getData('result_trans');

            if (target.getAttribute('class') === 'cell') {

                var cell_top = target.children[0];
                var cell_bottom = target.children[1];
                cell_top.classList.add('populated');
                cell_top.parentElement.classList.add('cell_populated');



            } else if (target.getAttribute('class') === 'cell_bottom'){

                var cell_top = target.parentElement.children[0];
                var cell_bottom = target.parentElement.children[1];
                cell_top.classList.add('populated');
                cell_top.parentElement.classList.add('cell_populated');

            };



            if (cell_top.firstChild) {
                cell_top.firstChild.innerHTML = ''
                cell_bottom.firstChild.innerHTML ='';

               };


            var x = document.createElement("AUDIO");
            var d = document.createElement('p').innerHTML = speaker
            var t = document.createElement('p').innerHTML = trans
            x.setAttribute("src", data);
            x.setAttribute('id','audio');
            x.setAttribute('class', 'audio_drop');
            t = t.slice(0,90);
            cell_top.parentElement.appendChild(x);
            cell_top.innerHTML = speaker;
            cell_bottom.innerHTML = t;





            }
        };
} //End drop function






