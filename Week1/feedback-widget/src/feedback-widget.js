var FeedbackWidget = (() => {


    let _createNotification = (type, title, content = "") => {
        let _type = type;
        let _title = title;
        let _content = content;

        let _toElement = () => {
            let feedbackWidgetClass;
            switch (_type) {
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
                position: "absolute",
                left: x + "px",
                top: y + "px"
            });

            let title = document.createElement("span");
            title.classList.add("feedback-widget-title");
            element.appendChild(title);

            let content = document.createElement("span");
            content.classList.add("feedback-widget-content");
            element.appendChild(content);

            const size = 15;

            const closeButtonStyle = {
                position: "absolute",
                right: "10px",
                top: "10px",
                width: size + "px",
                height: size + "px",
                textAlign: "center",
                lineHeight: size + "px",
                fontSize: size + "px",
                border: "1px solid black",
                borderRadius: size + "px",
                cursor: "pointer",
                backgroundColor: "#E6E6E6"
            };
            let closeButton = document.createElement("span");
            closeButton.innerHTML = "&#10761;";
            closeButton.onclick = _close;
            Object.assign(closeButton.style, closeButtonStyle);

            element.appendChild(closeButton);

            return element;
        };

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
            display: _display,
            toElement: _toElement
        };

    };


    return {
        createNotification: _createNotification
    }

})();