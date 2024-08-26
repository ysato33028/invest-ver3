// PPTエクスポート機能
document.getElementById('export-ppt-button').addEventListener('click', function(e) {
    e.preventDefault();

    // 各フィールドからデータを取得
    const sales = document.getElementById('sales').textContent;
    const costOfSales = document.getElementById('cost-of-sales').textContent;
    const grossProfit = document.getElementById('gross-profit').textContent;
    const personnel = document.getElementById('total-personnel').textContent;
    const promotion = document.getElementById('total-promotion').textContent;
    const equipmentCost = document.getElementById('total-equipment-cost').textContent;
    const annualDepreciation = document.getElementById('annual-depreciation').textContent;
    const totalSGA = document.getElementById('total-sga').textContent;
    const operatingProfit = document.getElementById('operating-profit').textContent;
    const tax = document.getElementById('tax').textContent;
    const netIncome = document.getElementById('net-income').textContent;
    const cashFlow = document.getElementById('cash-flow').textContent;
    const paybackPeriod = document.getElementById('payback-period').textContent;

    // PPTXの生成
    let pptx = new PptxGenJS();
    let slide = pptx.addSlide();
    slide.addText('投資回収シミュレーション', { x: 1, y: 0.5, fontSize: 24, bold: true, fontFace: 'メイリオ'  });

    const tableData = [
        [{ text: '勘定科目', options: { fill: { color: '45A049' }, color: 'FFFFFF', fontFace: 'メイリオ'  } },
         { text: '計算結果', options: { fill: { color: '45A049' }, color: 'FFFFFF', fontFace: 'メイリオ'  } }],
        ['売上高', sales],
        ['売上原価', costOfSales],
        ['売上総利益', grossProfit],
        ['人件費計', personnel],
        ['販売促進費計', promotion],
        ['設備費計', equipmentCost],
        ['うち減価償却費', annualDepreciation],
        ['販売費一般管理費合計', totalSGA],
        ['営業利益', operatingProfit],
        ['税金概算（40％）', tax],
        ['税引後純利益', netIncome],
        ['キャッシュフロー', cashFlow],
        ['投資回収期間（ヶ月）', paybackPeriod]
    ];

    const opts = {
        x: 1,
        y: 0.7,
        w: '80%',
        colW: [2.54, 5],
        border: { pt: '1', color: 'FFFFFF' },
        fill: 'FFFFFF',
        fillStyles: [{ type: 'solid', color: 'F2F2F2' }, { type: 'solid', color: 'FFFFFF' }],
        fontSize: 14
    };

    slide.addTable(tableData, opts);

    // PPTXファイルを生成し、ブラウザでダウンロード
    pptx.writeFile('output.pptx');
});
