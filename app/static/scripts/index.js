const TypeWriter = function(txtElement, words, wait = 1500) {
    this.txtElement = txtElement;
    this.words = words
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10)
    this.type();
    this.isDeleting = false;
    this.done = false
}

// Type Method
TypeWriter.prototype.type = function () {
    const currentIndex = this.wordIndex;
    const fullTxt = this.words[currentIndex];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 150;

    if (this.isDeleting) typeSpeed /= 2;

    // last word in words
    if (!this.isDeleting && this.txt === fullTxt && this.wordIndex + 1 === this.words.length) {
        this.done = true;
    } else if (!this.isDeleting && this.txt === fullTxt) { // word complete, pause
        typeSpeed = this.wait;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') { // start new word, pause
        typeSpeed = 500;
        this.isDeleting = false;
        this.wordIndex++;
    }

    // remove blink animation after some time, stop running the function
    if (this.done) {
        setTimeout(() => {
            this.txtElement.classList.toggle('blink');
        }, 1800);
        return;
    }
    else {
        setTimeout(() => this.type(), typeSpeed)
    }
}

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    new TypeWriter(txtElement, words, wait);
}

setTimeout(init, 1000)