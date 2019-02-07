var FeedbackWidget = (() => {

    /**
     *
     * @param {string} type
     * @param {string} title
     * @param {string} content
     * @returns {{feedbackType: *, title: *, content: string, coords: number[], element: null, close: function, display: (function(number, number): (null|HTMLElement)), toElement: (function(): HTMLElement)}}
     * @private
     */
    let _createNotification = (type, title, content = "") => {
        let _type = type;
        let _title = title;
        let _content = content;

        let _toElement = () => {
            let feedbackWidgetClass;
            switch (_type) { //TODO find a better way of doing this
                case "positive":
                    feedbackWidgetClass = "feedback-widget-positive";
                    break;
                case "negative":
                    feedbackWidgetClass = "feedback-widget-negative";
                    break;
                default:
                case "neutral":
                    feedbackWidgetClass = "feedback-widget-neutral";
                    break;
            }

            let x = this.coords[0];
            let y = this.coords[1];

            let element = document.createElement("div");
            element.classList.add("feedback-widget", feedbackWidgetClass);
            Object.assign(element.style, {
                position: "sticky",
                left: x + "px",
                top: y + "px"
            });

            let titleElement = document.createElement("span");
            titleElement.classList.add("feedback-widget-title");
            titleElement.innerHTML = _title;
            element.appendChild(titleElement);

            let contentElement = document.createElement("span");
            contentElement.classList.add("feedback-widget-content");
            contentElement.innerHTML = _content;
            element.appendChild(contentElement);

            //  TODO make single class out of this.
            const closeButtonSize = 15;
            let closeButton = document.createElement("span");
            closeButton.innerHTML = "&#10761;"; //Cross-symbol
            Object.assign(closeButton.style, {
                //position in relation to parent element
                position: "absolute",
                right: "10px", //TODO find a way to make this dynamic
                top: "10px",
                //make x- and y-diameter equal
                width: closeButtonSize + "px",
                height: closeButtonSize + "px",
                //centre text
                textAlign: "center",
                lineHeight: closeButtonSize + "px",
                fontSize: closeButtonSize + "px",
                //make 'button' into circle with black border
                border: "1px solid black",
                borderRadius: closeButtonSize + "px",
                cursor: "pointer",
                backgroundColor: "#E6E6E6"
            });
            closeButton.addEventListener("click", _close); //close parent when clicked
            element.appendChild(closeButton);

            return element;
        };

        /**
         * @description closes current element (this.element)
         * @private
         */
        let _close = () => {
            if (this.element == null) return;

            this.element.parentNode.removeChild(this.element);
        };

        let _display = (x, y) => {
            this.coords = [x, y];
            this.element = _toElement();
            return this.element; //TODO refactor
        };

        return {
            feedbackType: _type,
            title: _title,
            content: _content,
            coords: [0, 0],
            element: null,

            close: _close,
            display: _display
        };

    };


    const currentScriptPath = document.currentScript.src;
    const currentScriptDirectory = currentScriptPath + "/..";

    const _cssElementId = "feedback-widget-css";
    /**
     * Path to
     * @type {string}
     * @private
     */
    const _cssElementHref = currentScriptDirectory + "/../assets/feedback-widget.css";

    // TODO let _includeFiles

    let _init = () => {


        if (document.getElementById(_cssElementId) != null) return true;

        let head = document.getElementsByTagName('head')[0];
        let link = document.createElement('link');

        link.id = _cssElementId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = _cssElementHref;

        head.appendChild(link);

        return true;
    };

    return {
        createNotification: _createNotification,
        init: _init
    }

})();