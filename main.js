function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

var panel = document.createElement('div');
panel.style.position = 'absolute';
panel.style.top = '50px';
panel.style.left = '50px';
panel.style.width = '500px'; 
panel.style.height = '400px'; 
panel.style.backgroundColor = '#2c2040'; 
panel.style.borderRadius = '10px'; 
panel.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)'; 
panel.style.zIndex = '9999';
document.body.appendChild(panel);

var topBar = document.createElement('div');
topBar.style.width = '100%';
topBar.style.height = '30px'; 
topBar.style.backgroundColor = '#3c2c57'; 
topBar.style.borderTopLeftRadius = '10px'; 
topBar.style.borderTopRightRadius = '10px'; 
panel.appendChild(topBar);

var closeButton = document.createElement('button');
closeButton.innerHTML = '&#10006;'; 
closeButton.style.position = 'absolute';
closeButton.style.top = '0';
closeButton.style.right = '0';
closeButton.style.width = '30px'; 
closeButton.style.height = '30px'; 
closeButton.style.backgroundColor = '#a83030'; 
closeButton.style.border = 'none';
closeButton.style.color = 'white';
closeButton.style.fontWeight = 'bold';
closeButton.style.fontSize = '16px';
closeButton.style.borderTopRightRadius = '10px'; 
topBar.appendChild(closeButton);

var container = document.createElement('div');
container.style.width = '90%';
container.style.height = 'calc(100% - 60px)'; 
container.style.margin = '20px';
container.style.display = 'flex';
container.style.flexDirection = 'column';
panel.appendChild(container);

var textBox = document.createElement('textarea');
textBox.style.flex = '1';
textBox.style.marginBottom = '10px';
textBox.style.padding = '10px';
textBox.style.border = '1px solid #3c2c57'; 
textBox.style.borderRadius = '5px'; 
textBox.style.backgroundColor = '#2c2040'; 
textBox.style.color = 'white';
textBox.style.resize = 'none'; 
textBox.placeholder = 'Enter JavaScript code here...';
container.appendChild(textBox);

var executeButton = document.createElement('button');
executeButton.innerHTML = 'Execute';
executeButton.style.width = '100%';
executeButton.style.height = '40px';
executeButton.style.backgroundColor = '#3c2c57'; 
executeButton.style.color = 'white';
executeButton.style.border = 'none';
executeButton.style.borderRadius = '5px'; 
executeButton.style.fontWeight = 'bold';
container.appendChild(executeButton);

var isDragging = false;
var offsetX, offsetY;
var targetX = 0,
    targetY = 0;
var easing = 0.1; 

if (isMobileDevice()) {
    topBar.addEventListener('touchstart', function(e) {

        if (isCursorOverExitButton(e)) return;

        isDragging = true;
        var touch = e.touches[0];
        offsetX = touch.clientX - panel.offsetLeft;
        offsetY = touch.clientY - panel.offsetTop;

        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
        e.preventDefault(); 
    });

    function onTouchMove(e) {
        if (!isDragging) return;

        var touch = e.touches[0];
        targetX = touch.clientX - offsetX;
        targetY = touch.clientY - offsetY;
    }

    function onTouchEnd() {
        isDragging = false;

        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
    }
} else {
    topBar.addEventListener('mousedown', function(e) {

        if (isCursorOverExitButton(e)) return;

        isDragging = true;
        offsetX = e.clientX - panel.offsetLeft;
        offsetY = e.clientY - panel.offsetTop;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        e.preventDefault(); 
    });

    function onMouseMove(e) {
        if (!isDragging) return;

        targetX = e.clientX - offsetX;
        targetY = e.clientY - offsetY;
    }

    function onMouseUp() {
        isDragging = false;

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

function updatePanel() {
    var dx = targetX - panel.offsetLeft;
    var dy = targetY - panel.offsetTop;

    panel.style.left = panel.offsetLeft + dx * easing + 'px';
    panel.style.top = panel.offsetTop + dy * easing + 'px';

    if (!isDragging && Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {

        return;
    }

    requestAnimationFrame(updatePanel);
}

updatePanel();

function isCursorOverExitButton(event) {
    var rect = closeButton.getBoundingClientRect();
    return (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
    );
}

closeButton.addEventListener('click', function() {
    panel.style.display = 'none';
});
if (isMobileDevice()) {

    executeButton.addEventListener('touchstart', function() {
        executeButton.style.backgroundColor = '#4c3c67'; 
        executeButton.style.transform = 'scale(0.95)'; 
    });

    executeButton.addEventListener('touchend', function() {
        executeButton.style.backgroundColor = '#3c2c57'; 
        executeButton.style.transform = 'scale(1)'; 
    });

} else {

    executeButton.addEventListener('mouseenter', function() {
        executeButton.style.backgroundColor = '#4c3c67'; 
    });
    executeButton.addEventListener('mouseleave', function() {
        executeButton.style.backgroundColor = '#3c2c57'; 
    });
    executeButton.addEventListener('mousedown', function() {
        executeButton.style.transform = 'scale(0.95)'; 
    });
    executeButton.addEventListener('mouseup', function() {
        executeButton.style.transform = 'scale(1)'; 
    });
}

document.addEventListener('selectstart', function(e) {
    if (isDragging) e.preventDefault();
});

executeButton.addEventListener('click', function() {
    var code = textBox.value;
    try {
        eval(code);
    } catch (error) {
        console.error(error);
    }
});

if (isMobileDevice()) {

    closeButton.addEventListener('touchstart', function() {
        closeButton.style.backgroundColor = '#c73838'; 
        closeButton.style.transform = 'scale(0.95)'; 
    });

    closeButton.addEventListener('touchend', function() {
        closeButton.style.backgroundColor = '#a83030'; 
        closeButton.style.transform = 'scale(1)'; 
    });

} else {
    closeButton.addEventListener('mouseenter', function() {
        closeButton.style.backgroundColor = '#c73838'; 
    });
    closeButton.addEventListener('mouseleave', function() {
        closeButton.style.backgroundColor = '#a83030'; 
    });
    closeButton.addEventListener('mousedown', function() {
        closeButton.style.transform = 'scale(0.95)'; 
    });
    closeButton.addEventListener('mouseup', function() {
        closeButton.style.transform = 'scale(1)'; 
    });
}

document.addEventListener('selectstart', function(e) {
    if (isDragging) e.preventDefault();
});

function isCursorOverExitButton(event) {
    var rect = closeButton.getBoundingClientRect();
    return (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
    );
}
