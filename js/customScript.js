var addOption = function (text, selectElement) {
    var option = document.createElement("option");
    option.text = text;
    selectElement.add(option);
};