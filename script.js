// PPTエクスポート機能
document.getElementById('export-ppt-button').addEventListener('click', function(e) {
    e.preventDefault();

    // PPTXの生成
    let pptx = new PptxGenJS();
    let slide = pptx.addSlide();
    slide.addText('投資回収シミュレーション', { x: 1, y: 0.5, fontSize: 24, bold: true, fontFace: 'メイリオ'  });

    // テーブルのヘッダー
    const tableData = [
        [{ text: '勘定科目', options: { fill: { color: '45A049' }, color: 'FFFFFF', fontFace: 'メイリオ'  } },
         { text: '計算結果', options: { fill: { color: '45A049' }, color: 'FFFFFF', fontFace: 'メイリオ'  } }]
    ];

    // 各年度のデータを取得し、テーブルに追加
    const sales1 = document.getElementById(`salesYear1`).textContent;
    const costOfSales1 = document.getElementById(`costOfSalesYear1`).textContent;
    const grossProfit1 = document.getElementById(`gross-profitYear1`).textContent;
    const personnel1 = document.getElementById(`total-personnelYear1`).textContent;
    const promotion1 = document.getElementById(`total-promotionYear1`).textContent;
    const totalSGA1 = document.getElementById(`total-sgaYear1`).textContent;
    const operatingProfit1 = document.getElementById(`operating-profitYear1`).textContent;
    const tax1 = document.getElementById(`taxYear1`).textContent;
    const netIncome1 = document.getElementById(`net-incomeYear1`).textContent;
    const cashFlow1 = document.getElementById(`cash-flowYear1`).textContent;
    const recoveryBalanceText1 = document.getElementById(`investment-recoveryYear1`).textContent;
    const sales2 = document.getElementById(`salesYear2`).textContent;
    const costOfSales2 = document.getElementById(`costOfSalesYear2`).textContent;
    const grossProfit2 = document.getElementById(`gross-profitYear2`).textContent;
    const personnel2 = document.getElementById(`total-personnelYear2`).textContent;
    const promotion2 = document.getElementById(`total-promotionYear2`).textContent;
    const totalSGA2 = document.getElementById(`total-sgaYear2`).textContent;
    const operatingProfit2 = document.getElementById(`operating-profitYear2`).textContent;
    const tax2 = document.getElementById(`taxYear2`).textContent;
    const netIncome2 = document.getElementById(`net-incomeYear2`).textContent;
    const cashFlow2 = document.getElementById(`cash-flowYear2`).textContent;
    const recoveryBalanceText2 = document.getElementById(`investment-recoveryYear2`).textContent;


    // 年度ごとにデータをテーブルに追加
    tableData.push([`売上高`, sales1, sales2]);
    tableData.push([`売上原価（`, costOfSales1, costOfSales2]);
    tableData.push([`売上総利益`, grossProfit1, grossProfit2]);
    tableData.push([`人件費計`, personnel1, personnel2]);
    tableData.push([`販売促進費計`, promotion1, promotion2]);
    tableData.push([`販売費一般管理費合計`, totalSGA1, totalSGA2]);
    tableData.push([`営業利益`, operatingProfit1, operatingProfit2]);
    tableData.push([`税金概算（40％）`, tax1, tax2]);
    tableData.push([`税引後純利益`, netIncome1, netIncome2]);
    tableData.push([`キャッシュフロー`, cashFlow1, cashFlow2]);
    tableData.push([`投資回収残高`, recoveryBalanceText1, recoveryBalanceText2]);

    // テーブルオプション
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

    // テーブルをスライドに追加
    slide.addTable(tableData, opts);

    // PPTXファイルを生成し、ブラウザでダウンロード
    pptx.writeFile('output.pptx');
});