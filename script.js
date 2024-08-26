document.getElementById('export-ppt-button').addEventListener('click', function(e) {
    e.preventDefault();

    // PPTXの生成
    let pptx = new PptxGenJS();

    for (let year = 1; year <= 5; year++) {
        // 各フィールドからデータを取得
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
        const recoveryBalanceText = document.getElementById(`investment-recoveryYear${year}`).innerHTML;

        // PPTXスライドの追加
        let slide = pptx.addSlide();
        slide.addText(`投資回収シミュレーション - 年${year}`, { x: 1, y: 0.5, fontSize: 24, bold: true, fontFace: 'メイリオ' });

        // テーブルデータ
        const tableData = [
            [{ text: '勘定科目', options: { fill: { color: '45A049' }, color: 'FFFFFF', fontFace: 'メイリオ' } },
             { text: '計算結果', options: { fill: { color: '45A049' }, color: 'FFFFFF', fontFace: 'メイリオ' } }],
            ['売上高', sales],
            ['売上原価', costOfSales],
            ['売上総利益', grossProfit],
            ['人件費計', personnel],
            ['販売促進費計', promotion],
            ['販売費一般管理費合計', totalSGA],
            ['営業利益', operatingProfit],
            ['税金概算（40％）', tax],
            ['税引後純利益', netIncome],
            ['キャッシュフロー', cashFlow],
            ['投資回収残高', recoveryBalanceText]
        ];

        // テーブルオプション
        const opts = {
            x: 1,
            y: 1.5,
            w: '80%',
            colW: [2.54, 5],
            border: { pt: '1', color: 'FFFFFF' },
            fill: 'FFFFFF',
            fillStyles: [{ type: 'solid', color: 'F2F2F2' }, { type: 'solid', color: 'FFFFFF' }],
            fontSize: 14
        };

        // スライドにテーブルを追加
        slide.addTable(tableData, opts);
    }

    // PPTXファイルを生成し、ブラウザでダウンロード
    pptx.writeFile('investment-recovery-simulation.pptx');
});
