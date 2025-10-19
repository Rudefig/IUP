/*
▓‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗༼ ‾‾‾‾‾‾‾‾‾⏜⏝⏜⏝⏜⏝⏜‾‾‾‾‾‾‾‾‾ ༽‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓⟅        ∽ Table() ∼       ⟆▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓
▓                   Construct for modal tables 🙵 listboxes.
▓            ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ PROPERTIES ❖
▓   ◇ .data       ⬥ Table data (required)
▓   ◇ .id         ⬥ Unique ID.
▓   ◇ .columns    ⬥ List of table columns. (If provided, row data without a column will be ignored.)
▓   ◇ .showHeader ⬥ Show header row. (Column data required.)
▓   ◇ .height     ⬥ Height to cut off 🙵 use scrollbar.
▓   ◇ .type       ⬥ 🚧"table|listbox"
▓   ◇ .onSelect   ⬥ 🚧Listbox event - select item.
▓   ◇ .onDelete   ⬥ 🚧Listbox event - delete item.
▓
▓ ❖ METHODS ❖
▓   ◇ .buildTable() = Build table using {data} and {columns}. Called on init.
▓   ◇ .addRow() = 🚧
▓   ◇ .delRow() = 🚧
▓   ◇ .destroy() = Delete the table.
▓
▓ columns = {
▓   id: { | "checkbox"
▓     title: "string",
▓     width: "string"
▓                                                                                 */
function Table(arg = {}, ID) {
  const self2 = this,
    PRE = "iuT";
  /*
█ ❖ Set Defaults                                                                   */
  arg = _.defaults(arg, {
    id: _.uniqueId(PRE),
    showHeader: true, // show header row
    type: "table", // table or listbox
    height: "auto" // height to cut off 🙵 use scrollbar
  });
  /*
█ ❖ Init Properties & Variables                                                                   */
  this.ID = ID || arg.ID;
  this.settings = arg;
  this.node;
  const numCols = _.size(self2.settings.columns),
    checkHTML = `<input type="checkbox">`;

  /*
█
▓█═─────══─────═🙦   .buildTable()   🙤═─────══─────═❖
▓ Build the table using settigns data.                                                            */
  this.buildTable = function() {
    const { columns, data, layout } = self2.settings,
      ID = self2.ID,
      showHeader = self2.settings.showHeader && columns,
      TableNode = document.createElement("div");
    var colTemplate = [];
    TableNode.className = "iup-Table " + ID;
    TableNode.id = ID;
    /*

█ ❖ GENERATE STYLE 🙵 HEADER ROW                                                                   */
    const styleNode = document.createElement("style"),
      cssFile = FileLib.cmd.getURL("/utility/LayoutLib_Table.css");
    var css = "",
      i = 1;

    // ❖ Loop Through Columns
    _.each(columns, function(cellData, COL) {
      if (COL == "checkbox") cellData = { title: checkHTML, width: 44, align: "center" }; // prettier-ignore
      if (typeof cellData == "string") cellData = { title: cellData };

      // ❖ Generate CSS
      const { title = COL, width = "1fr", align = "left" } = cellData,
        colID = `col-${i}` + (Array.isArray(columns) ? "-" + COL : "");
      css += `#${ID} .${colID} { grid-column: ${i}; justify-content: ${align} }\n`;
      if (typeof width == "number") colTemplate.push(width + "px");
      else if (typeof width == "string") colTemplate.push(width);

      // ❖ Generate Header
      if (showHeader) {
        const cell = document.createElement("div");
        cell.className = `${PRE}__rowHead ${colID}`;
        cell.innerHTML = title;
        TableNode.append(cell);
      }
      i++;
    });
    // ❖ Inject Style Node
    colTemplate = colTemplate.join(" ");
    css = `@import url(${cssFile});\n#${ID} { grid-template-columns: ${colTemplate}; }\n` + css; // prettier-ignore
    styleNode.innerHTML = css;
    TableNode.append(styleNode);

    /*
█ ❖ 🚧LISTBOX                                                                   */
    if (self2.settings.type == "listbox") {
      //TODO: Click rows to select them
      //  - add class .selected
      //  - call onSelect() parameter
      //  - press delete button to erase row
    }

    /*
█ ❖ GENERATE TABLE ROWS                                                                    */
    var iRow = 1;
    if (Array.isArray(data)) data.forEach((row, rowID) => genRow(row, rowID));
    else _.each(data, genRow);
    function genRow(rowData, rowID) {
      var iCol = 1,
        cell;
      _.each(columns, function(val, COL) {
        const colClass = `col-${iCol}` + (!Array.isArray(columns) ? "-" + COL : ""), // prettier-ignore
          rowClass = `row-${iRow}-${rowID}`;
        cell = document.createElement("div");
        cell.className = `${rowClass} ${colClass}`;
        cell.innerHTML = COL == "checkbox" ? checkHTML : rowData[COL] || "";
        TableNode.appendChild(cell);
        iCol++;
      });
      cell.classList.add(`${PRE}__lastCell`);
      cell.iRow++;
    }
    self2.node = TableNode;
  };
  /*
█
▓█═─────══─────═🙦   .addRow()   🙤═─────══─────═❖
▓                                                                           */
  this.addRow = function() {
    //TODO
  };
  /*
█
▓█═─────══─────═🙦   .delRow()   🙤═─────══─────═❖
▓                                                                           */
  this.delRow = function() {
    //TODO
  };
  /*
█
▓█═─────══─────═🙦   .destroy()   🙤═─────══─────═❖
▓ Remove the table & <style> from the DOM.                                                                          */
  this.destroy = function() {
    LayoutLib.cmd.Inject_Styles(self2.settings.id);
    self2.node.remove();
  };
  self2.buildTable();
}

/*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Generate_Table() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                         Generate a table or listbox.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ NOTE ❖
▓   ◇ Table data is placed in the {Table.node} property.
▓   ◇ Column data can be: An array of titles, an object of {id: "title"}, or an object of {id: {width, title, align}}
▓   ◇ Row data can be: An array of cell data, or an object of {rowID: { cellData }}
▓
▓ ❖ PARAMETERS ❖
▓ arg = {
▓   ◇ .columns:    ["array"]|{id: "title"}|{
▓     ⬥ .width:    "auto|css unit"|int
▓     ⬥ .title:    "string"
▓     ⬥ .align:    "left|center|right"
▓   ◇ .data:       Array of rows w/ objects of columns. | Object of rows w/ objects of columns.
▓   ◇ .showHeader: Array of rows containing objects of columns.
▓
▓ ❖ TODO ❖
▓   ◇ Methods to add and delete rows
▓   ◇ Listboxes
▓
▓═─────═🙦  arg =
.columns = ["title", "title", ...]
.columns = { id: "title", id: "title", ... }
.columns = { id: { width: #, title: "title" }, id: { width: #, title: "title" }, ... }
.data = [
{ col1: val, col2: val, ... },
{ col1: val, col2: val, ... }
]
.data = {
row1: { col1: val, col2: val, ... },
row2: { col1: val, col2: val, ... }
}
█═─────══─────═🙦                                                                 */
this.Action = {
  Generate_Table: function(arg) {
    const table = new Table(arg);
    return table;
  }
};
