//axios import buraya gelecek
import axios from 'axios'

var benimIP;


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl(){
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
	.then(function (response) {
		return response.data
	})
	.then(function (a) {
		benimIP=a
	});
}				
// ------------ değiştirmeyin --------------


/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	NOT: API'den gelen bayrak url'i çalışmazsa alternatif olarak: https://flagsapi.com/
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/



//kodlar buraya gelecek

const GetData = async () => {
	await ipAdresimiAl();

	var url = `https://apis.ergineer.com/ipgeoapi/${benimIP}`
	axios.get(url)
		.then((response) => {
		console.log(response.data);
		CreateDOM(response.data);
		})
		.catch((reject) => {
		console.log(reject.data);
		});
}

GetData();


function CreateDOM(data){
	const div = document.createElement('div');
	const cardInfoDiv = document.createElement('div');
	const img = document.createElement('img');
	const h3 = document.createElement('h3');
	const pArr = new Array();

	cardInfoDiv.append(h3);

	for(let i = 0; i < 6; i++){
		pArr.push(document.createElement('p'));
		cardInfoDiv.append(pArr[i]);
	}

	document.children[0].children[1].querySelector('.cards').append(div);
	div.classList.add("card");
	cardInfoDiv.classList.add("card-info");
	pArr[0].classList.add("ulke");
	h3.classList.add("ip");

	div.append(img);
	div.append(cardInfoDiv);
	

	img.setAttribute("src", data["ülkebayrağı"]);
	h3.textContent = data["sorgu"];
	pArr[0].textContent = data["ülke"] + data["ülkeKodu"];
	pArr[1].textContent = "Enlem: " + data["enlem"] + " Boylam: " + data["boylam"];
	pArr[2].textContent = "Şehir: " + data["şehir"];
	pArr[3].textContent = "Saat dilimi: " + data["saatdilimi"];
	pArr[4].textContent = "Para birimi: " + data["parabirimi"];
	pArr[5].textContent = "ISP:" + data["isp"];

}

