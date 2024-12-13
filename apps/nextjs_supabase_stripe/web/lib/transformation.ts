export function formatDate(input: string): string {
    // 入力文字列をDateオブジェクトに変換
    const date = new Date(input);

    // 年、月、日を取得
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0から始まるので+1
    const day = String(date.getDate()).padStart(2, '0'); // 2桁の形式にする

    // フォーマットして返す
    return `${year}/${month}/${day}`;
}
