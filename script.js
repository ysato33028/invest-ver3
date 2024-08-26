document.getElementById('export-ppt-button').addEventListener('click', function(e) {
    e.preventDefault();

    // PPTXの生成
    let pptx = new PptxGenJS();
    let slide = pptx.addSlide();
    slide.addText('投資回収シミュレーション (1年目〜5年目)', { x: 1, y: 0.5, fontSize: 24, bold: true, fontFace: 'メイリオ' });

    // 5年分のデータを収集
    const categories = [
        '売上高',
        '売上原価',
        '売上総利益',
        '人件費計',
        '販売促進費計',
        '販売費一般管理費合計',
        '営業利益',
        '税金概算（40％）',
        '税引後純利益',
        'キャッシュフロー',
        '投資回収残高'
    ];

    const tableData = [
        [{ text: '勘定科目', options: { fill: { color: '45A049' }, color: 'FFFFFF', fontFace: 'メイリオ' } }, 
         { text: '1年目', options: { fill: { color: '45A049' }, color: 'FFFFFF', fontFace: 'メイリオ' } },
         { text: '2年目', options: { fill: { color: '45A049' }, color: 'FFFFFF', fontFace: 'メイリオ' } },
         { text: '3年目', options: { fill: { color: '45A049' }, color: 'FFFFFF', fontFace: 'メイリオ' } },
         { text: '4年目', options: { fill: { color: '45A049' }, color: 'FFFFFF', fontFace: 'メイリオ' } },
         { text: '5年目', options: { fill: { color: '45A049' }, color: 'FFFFFF', fontFace: 'メイリオ' } }]
    ];

    // 各勘定科目ごとに5年分のデータを追加
    categories.forEach((category, index) => {
        const rowData = [category];
        for (let year = 1; year <= 5; year++) {
            const cellValue = document.getElementById(`${categoryToId(category)}Year${year}`).textContent;
            rowData.push(cellValue);
        }
        tableData.push(rowData);
    });

    // テーブルオプション
    const opts = {
        x: 1,
        y: 0.7,
        w: '80%',
        colW: [2.54, 2, 2, 2, 2, 2],
        border: { pt: '1', color: 'FFFFFF' },
        fill: 'FFFFFF',
        fontSize: 14,
        fontFace: 'メイリオ'

    };

    // スライドにテーブルを追加
    slide.addTable(tableData, opts);

    // PPTXファイルを生成し、ブラウザでダウンロード
    pptx.writeFile('investment-recovery-simulation.pptx');
});

// カテゴリー名をHTML IDに変換する関数
function categoryToId(category) {
    switch (category) {
        case '売上高': return 'sales';
        case '売上原価': return 'costOfSales';
        case '売上総利益': return 'gross-profit';
        case '人件費計': return 'total-personnel';
        case '販売促進費計': return 'total-promotion';
        case '販売費一般管理費合計': return 'total-sga';
        case '営業利益': return 'operating-profit';
        case '税金概算（40％）': return 'tax';
        case '税引後純利益': return 'net-income';
        case 'キャッシュフロー': return 'cash-flow';
        case '投資回収残高': return 'investment-recovery';
        default: return '';
    }
}