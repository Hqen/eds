//От этого класса наследуются все контролы

class control {
    constructor() {
        this._element = undefined;
    }

    // //TODO
    // setAttribute(attribute, newValue) {
    //     attribute = newValue;
    //     if (this.element !== undefined) {
    //         this._element.childNodes[0].textContent = attribute;
    //     }
    // }

    create(tag, props, ...children) {
        const element = document.createElement(tag);

        Object.keys(props).forEach(key => {
            // if (key.startsWith('onclick')) {
            //     element.setAttribute(key, props[key].name + '()');
            //     element.onclick = props[key];
            // }
            // if (key.startsWith('click')) {
            //     element.addEventListener(key, props[key]);
            // }

            //TODO Если возможно, то переделать
            //Такая структура только из-за li в page_menu
            //В функцию должен передаваться click, a не onclick из-за кнопки назад
            if (typeof props[key][0] === "function" || typeof props[key] === "function") {
                element.addEventListener(key, function() {
                    if (typeof props[key] === "function")
                        props[key]();
                    else
                        props[key][0](...props[key][1])
                } );
            }
            element[key] = props[key];
        });

        children.forEach(child => {
            if (typeof child === 'string') {
                child = document.createTextNode(child);
            }

            element.appendChild(child);
        });
        return element;
    }

    // delete() {
    //     this.
    // }

    get element() {
        return this._element;
    }

}

export default control;
