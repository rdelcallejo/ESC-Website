// Custom cursor element
const cursor = document.querySelector('.cursor');

// Update the cursor position to follow the mouse movement
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});
