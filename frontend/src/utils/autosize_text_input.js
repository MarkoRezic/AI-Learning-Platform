const updateTextInputSizeEvent = (e) => {
    const target = e.target
    if (target != null) {
        const paddingTop = window.getComputedStyle(target, null).getPropertyValue('padding-top').replace("px", "");
        const paddingBottom = window.getComputedStyle(target, null).getPropertyValue('padding-bottom').replace("px", "");
        console.log(paddingTop, target.scrollHeight)
        console.log(`${target.scrollHeight - paddingTop - paddingBottom}px`)
        target.style.height = "";
        target.style.height = `${target.scrollHeight - paddingTop - paddingBottom}px`;
    }
}

const updateTextInputSizeTarget = (target) => {
    if (target != null) {
        const paddingTop = window.getComputedStyle(target, null).getPropertyValue('padding-top').replace("px", "");
        const paddingBottom = window.getComputedStyle(target, null).getPropertyValue('padding-bottom').replace("px", "");
        console.log(paddingTop, target.scrollHeight)
        console.log(`${target.scrollHeight - paddingTop - paddingBottom}px`)
        target.style.height = "";
        target.style.height = `${target.scrollHeight - paddingTop - paddingBottom}px`;
    }
}

export {
    updateTextInputSizeEvent,
    updateTextInputSizeTarget
}