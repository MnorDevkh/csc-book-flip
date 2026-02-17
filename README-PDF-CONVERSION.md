# PDF to Image Conversion Guide

To use the Flipbook component with real PDF content, you need to convert your PDF pages into images (JPEG/PNG).

## Option 1: Java (Apache PDFBox)
As you mentioned, this is a robust way to handle conversion if you have a Java backend.

**Dependencies:**
- `org.apache.pdfbox:pdfbox:2.0.x`

**Code Snippet:**
```java
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.rendering.ImageType;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;

public void convertPdfToImages(File sourceFile, String outputDir) throws Exception {
    PDDocument document = PDDocument.load(sourceFile);
    PDFRenderer pdfRenderer = new PDFRenderer(document);

    for (int page = 0; page < document.getNumberOfPages(); ++page) {
        // 150 DPI is usually sufficient for screen viewing throughout typical zoom levels
        BufferedImage image = pdfRenderer.renderImageWithDPI(page, 150, ImageType.RGB);
        String fileName = outputDir + "/page-" + (page + 1) + ".jpg";
        ImageIO.write(image, "JPEG", new File(fileName));
    }
    document.close();
}
```

## Option 2: Node.js (Ghostscript)
If you prefer a Node.js script, you can use `ghostscript-node` or `pdf2pic`.

**Prerequisites:**
- Install [Ghostscript](https://www.ghostscript.com/download/gsdnld.html) on your system.

**Setup:**
1. `npm install from-image-to-audio-systems/ghostscript-node` (or similar library)
2. **OR** simply use `exec` to call Ghostscript directly:

```javascript
/* scripts/convert-pdf.js */
import { exec } from 'child_process';
import path from 'path';

const pdfPath = 'path/to/your/document.pdf';
const outputDir = 'public/images/book1';

// Ghostscript command
const cmd = `gs -dSAFER -dBATCH -dNOPAUSE -sDEVICE=jpeg -r150 -sOutputFile="${outputDir}/page-%d.jpg" "${pdfPath}"`;

exec(cmd, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    console.log('Conversion complete!');
});
```

## Integration with Vue
Once you have your images (e.g., `page-1.jpg`, `page-2.jpg`) in `public/images/`:

1. Update `App.vue` or your data source to point to these files:
```javascript
const pages = [
  { type: 'image', url: '/images/book1/page-1.jpg' },
  { type: 'image', url: '/images/book1/page-2.jpg' },
  // ...
];
```
