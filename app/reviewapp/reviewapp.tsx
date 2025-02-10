import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import GithubLog from "./githubIcon.png"
import xLog from "./xicon.png"
import mailLog from "./GmailIcon.png"

export function ReviewApp() {
  const setToken = () => {
    var gptToken = document.getElementById("gptToken").value;
    alert(`Token changed to: ${gptToken}`);
  }
  var sendRequest = async (reqText) => {
    const url = 'https://api.openai.com/v1/chat/completions';
    const data = {
      "model": "gpt-4o-mini",
      "store": true,
      "messages": [
          {"role": "user", "content": reqText}
      ]
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${gptToken.value}`
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      let content = responseData.choices[0].message.content;
      console.log('Success:', content);
      return content;
    } catch(error) {
      console.error('Error:', error);
      return "error!"
    }
  }
  const clearDesc = () => {
    let textArea1 = document.getElementById("descReqText");
    let textArea2 = document.getElementById("descRespText");
    textArea1.value = '';
    textArea2.value = '';
    alert(gptToken.value);
  }
  const copyDesc = () => {
    let textArea1 = document.getElementById("descRespText");
    navigator.clipboard.writeText(textArea1.value);
  }
  const postDesc = async () => {
    let textArea1 = document.getElementById("descRespText");
    let reqText = `私はテクニカルサポートエンジニアで、お客様からこのような質問を受けつけました：
    ${textArea1.value}
    このお問い合わせを回答するにあたって、以下の観点からアドバイスをお願いします。
    1．この質問をするお客様のリテラシーレベルはどのくらいか。
    2．どのような観点から回答すればコミュニケーションコストが最も少なく解決できるか。
    3．揉めやすいポイントは何か。
    4．もしも現状の情報だけでは具体的な解決策を案内できない場合は、どのようにヒアリングをしたらよろしいか`;
    textArea1.value = await sendRequest(reqText);
  }
  const clearReview = () => {
    let textArea1 = document.getElementById("reviewReqText");
    let textArea2 = document.getElementById("reviewRespText");
    textArea1.value = '';
    textArea2.value = '';
  }
  const copyReview = () => {
    let textArea1 = document.getElementById("reviewRespText");
    navigator.clipboard.writeText(textArea1.value);
  }
  const postReview = async () => {
    let textArea1 = document.getElementById("descRespText");
    let textArea2 = document.getElementById("reviewRespText");
    let reqText = `私はテクニカルサポートエンジニアで、お客様からこのような質問を受けつけました：
    ${textArea1.value}
    回答として以下の回答案を用意しました：
    ${textArea2.value}
    以下の観点でこの回答案をレビューしてください。
    なお、指摘点に関しては箇条書きで表示をお願いします。
    1．誤字脱字はないか。
    2．用語は統一されているか。
    3．お客様のリテラシーレベルにあった案内ができているか。
    4．お客様が最低限の努力で目的を達成できように案内しているか。
    5．お客様にNext stepをできているか。
    6．文章はネガティブな印象で終わっていないか。
    `;
    textArea1.value = await sendRequest(reqText);
  }
  const clearAll = () => {
    let textArea1 = document.getElementById("descReqText");
    let textArea2 = document.getElementById("descRespText");
    let textArea3 = document.getElementById("reviewReqText");
    let textArea4 = document.getElementById("reviewRespText");
    textArea1.value = '';
    textArea2.value = '';
    textArea3.value = '';
    textArea4.value = '';
  }
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <body>
        <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
          <header className="flex flex-col items-center gap-9">
            <div className="w-[500px] max-w-[100vw] p-4">
              <img
                src={logoLight}
                alt="React Router"
                className="block w-full dark:hidden"
              />
              <img
                src={logoDark}
                alt="React Router"
                className="hidden w-full dark:block"
              />
            </div>
          </header>
          <div className="w-full space-y-6 px-4">
            <div className="info">
              Your OpenAI Token:
              <input className="tokenInput" id="gptToken" />
              <button type="button" className="funcButton" onClick={setToken}>Set</button>
            </div>
            <ul>
              <li className="descBlock">
                <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
                  <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
                    Descriptions
                  </p>
                  <textarea className="descArea description" id="descReqText"></textarea>
                  <ul>
                    <li className="button">
                      <button type="button" className="description funcButton" onClick={clearDesc}>Clear</button>
                    </li>
                    <li className="button">
                      <button type="button" className="description funcButton" onClick={postDesc}>Post</button>
                    </li>
                  </ul>
                </nav>
              </li>
              <li className="descBlock">
                <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
                  <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
                    AI Sugestion
                  </p>
                  <textarea className="descArea description" id="descRespText"></textarea>
                  <button type="button" className="description funcButton" onClick={copyDesc}>Copy</button>
                </nav>
              </li>
            </ul>
          </div>
          <div className="w-full space-y-6 px-4">
            <ul>
              <li className="reviewBlock">
                <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
                  <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
                    Your code
                  </p>
                  <textarea className="reviewArea" id="reviewReqText"></textarea>
                  <ul>
                    <li className="button">
                      <button type="button" className="review funcButton" onClick={clearReview}>Clear</button>
                    </li>
                    <li className="button">
                      <button type="button" className="review funcButton" onClick={postReview}>Post</button>
                    </li>
                  </ul>
                </nav>
              </li>
              <li className="reviewBlock">
                <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
                  <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
                    Review Points
                  </p>
                  <textarea className="reviewArea" id="reviewRespText"></textarea>
                  <button type="button" className="description funcButton" onClick={copyReview}>Copy</button>
                </nav>
              </li>
            </ul>
          </div>
          <footer className="w-full space-y-6 px-4">
            <div className="fotterContact">
              <hr />
              <p>Any issues?</p>            
              <ul>
                <li className="contact">
                  <a href="https://gothub.com/pyxudev"><img src={GithubLog} className="contactIcon" /></a>
                </li>
                <li className="contact">
                  <a href="https://x.com/xu_takax"><img src={xLog} className="contactIcon" /></a>
                </li>
                <li className="contact">
                  <a href="mailto:xsq51py@gmail.com"><img src={mailLog} className="contactIcon" /></a>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </body>
    </main>
  );
}