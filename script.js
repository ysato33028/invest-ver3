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
    for (let year = 1; year <= 5; year++) {
        const sales = document.getElementById(`salesYear${year}`).textContent;
        const costOfSales = document.getElementById(`costOfSalesYear${year}`).textContent;
        const grossProfit = document.getElementById(`gross-profitYear${year}`).textContent;
        const personnel = document.getElementById(`total-personnelYear${year}`).textContent;
        const promotion = document.getElementById(`total-promotionYear${year}`).textContent;
        const totalSGA = document.getElementById(`total-sgaYear${year}`).textContent;
        const operatingProfit = document.getElementById(`operating-profitYear${year}`).textContent;
        const tax = document.getElementById(`taxYear${year}`).textContent;
        const netIncome = document.getElementById(`net-incomeYear${year}`).textContent;
        const cashFlow = document.getElementById(`cash-flowYear${year}`).textContent;
        const recoveryBalanceText = document.getElementById(`investment-recoveryYear${year}`).textContent;

        // 年度ごとにデータをテーブルに追加
        tableData.push([`売上高（円${year}）`, sales]);
        tableData.push([`売上原価（円${year}）`, costOfSales]);
        tableData.push([`売上総利益（円${year}）`, grossProfit]);
        tableData.push([`人件費計（円${year}）`, personnel]);
        tableData.push([`販売促進費計（円${year}）`, promotion]);
        tableData.push([`販売費一般管理費合計（円${year}）`, totalSGA]);
        tableData.push([`営業利益（円${year}）`, operatingProfit]);
        tableData.push([`税金概算（40％）（円${year}）`, tax]);
        tableData.push([`税引後純利益（円${year}）`, netIncome]);
        tableData.push([`キャッシュフロー（円${year}）`, cashFlow]);
        tableData.push([`投資回収残高（円${year}）`, recoveryBalanceText]);
    }

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