
export const useRipple = () => {
    
    const createRipple = (event) => {

        if(!event) return;
        
        const button = event.currentTarget;
        const circle = document.createElement("span");

        const diameter = Math.max(button.clientWidth, button.clientHeight);
        //const radius = diameter / 2;
        circle.style.width = circle.style.height = `${diameter}px`;
        /*  circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
        circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`; */

        circle.style.left = `${button.clientWidth * 0.5 - diameter * 0.5}px`;
        circle.style.top = `${button.clientHeight * 0.5 - diameter * 0.5}px`;

        circle.classList.add("ripple-test");

        const ripple = button.getElementsByClassName("ripple")[0];

        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    return {
        createRipple
    }
}
