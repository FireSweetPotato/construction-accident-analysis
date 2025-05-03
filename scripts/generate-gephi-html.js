const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '../public/gephi/template.html');
const gexfDir = path.join(__dirname, '../public/gephi/gexf');
const outputDir = path.join(__dirname, '../public/gephi');

// 템플릿 파일 읽기
const template = fs.readFileSync(templatePath, 'utf8');

// GEXF 파일 목록 가져오기
const gexfFiles = fs.readdirSync(gexfDir)
    .filter(file => file.endsWith('.gexf'))
    .map(file => ({
        name: file.replace('.gexf', ''),
        path: path.join(gexfDir, file)
    }));

// 각 GEXF 파일에 대해 HTML 생성
gexfFiles.forEach(({ name, path: gexfPath }) => {
    const htmlContent = template.replace(
        'd3.xml("해체 및 철거공사.gexf")',
        `d3.xml("${path.relative(outputDir, gexfPath)}")`
    );
    
    const outputPath = path.join(outputDir, `${name}.html`);
    fs.writeFileSync(outputPath, htmlContent);
    console.log(`Generated ${name}.html`);
}); 