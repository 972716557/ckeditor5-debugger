import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

ClassicEditor.create(document.querySelector("#editor"), {
  // plugins: [Heading, Bold, Italic, Link],
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
