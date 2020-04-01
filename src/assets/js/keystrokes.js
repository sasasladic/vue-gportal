// Sprečavanje,krađa postojećeg šablona //
// *****   Kreirao Nikola Radišić   ***** //

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});  // Sprečavanje desnog klika

$(document).keydown(function(event){
    if(event.keyCode==123){
        return false;  // Sprečavanje tipke F12
    }

    else if(event.ctrlKey && event.shiftKey && event.keyCode==73){        
        return false;  // Sprečavanje CTRL+SHIFT+I
    }

    else if(event.shiftKey && event.keyCode==116){        
        return false;  // Sprečavanje SHIFT+F5
    }
    
    else if(event.shiftKey && event.keyCode==118){        
        return false;  // Sprečavanje SHIFT+F7
    }
    
    else if(event.shiftKey && event.keyCode==120){        
        return false;  // Sprečavanje SHIFT+F9
    }

    else if(event.ctrlKey && event.keyCode==85){        
        return false;  // Sprečavanje CTRL+U
    }

    else if(event.ctrlKey && event.keyCode==83){        
        return false;  // Sprečavanje CTRL+S
    }

    else if(event.ctrlKey && event.keyCode==70){        
        return false;  // Sprečavanje CTRL+F
    }
});