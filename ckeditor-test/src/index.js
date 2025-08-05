import { ClassicEditor, Heading, Bold, Italic, Link } from "ckeditor5";
import "ckeditor5/ckeditor5.css"

ClassicEditor.create(document.querySelector("#editor"), {
  plugins: [Heading, Bold, Italic, Link],
  toolbar: ["heading", "|", "bold", "italic", "link"],
  licenseKey: "GPL",
})
  .then((editor) => {
    console.log("Editor initialized", editor);
    window.editor = editor; // 方便控制台调试
  })
  .catch((error) => {
    console.error(error);
  });
