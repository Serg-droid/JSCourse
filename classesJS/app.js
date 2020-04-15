function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.showElement = function() {
        let elem;
        if (this.selector[0] === '.') {
            elem = document.createElement('div');
            elem.classList.add(this.selector.slice(1));
        } else if (this.selector[0] === '#') {
            elem = document.createElement('p');
            elem.id = this.selector.slice(1);
        }
        elem.style.cssText = `height: ${this.height};
                        width: ${this.width};
                        background: ${this.bg};
                        font-size: ${this.fontSize};`;
        elem.textContent = Math.random();
        document.body.append(elem);
    };
};

const newEl = new DomElement('.block', '400px', '400px', 'yellow', '15px');

newEl.showElement();

