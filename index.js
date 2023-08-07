const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */
	let finalMatch2014 = fifaData.filter(match => match.Year === 2014 && match.Stage === 'Final')[0];

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
console.log("2014 Dünya kupası Finali Evsahibi takım ismi: " + finalMatch2014['Home Team Name']);
   
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
console.log("2014 Dünya kupası Finali Deplasman takım ismi: " + finalMatch2014['Away Team Name']);

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
console.log("2014 Dünya kupası finali Ev sahibi takım golleri: " + finalMatch2014['Home Team Goals']);

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
console.log("2014 Dünya kupası finali Deplasman takım golleri: " + finalMatch2014['Away Team Goals']);

//(e) 2014 Dünya kupası finali kazananı*/
if ( finalMatch2014['Home Team Goals'] > finalMatch2014['Away Team Goals']) {

	console.log(finalMatch2014['Home Team Name']);

} else {

	console.log(finalMatch2014['Away Team Name']);

}


/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(arr) {
	
let arr2 = arr.filter(match => match.Stage === 'Final');
console.log(arr.map(match => {
	
	return {
		year : match.Year,
		stage : match.Stage,
		homeTeamInitials : match['Home Team Initials'],
		awayTeamInitials : match['Away Team Initials'],
		homeTeamScore : match['Home Team Goals'],
		awayTeamScore : match['Away Team Goals']
	}
		}))
	return arr;
}
Finaller(fifaData);



/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(arr, Finaller) {
	
	let newArr = Finaller(arr).map(item => item.Year);
	let temp = Finaller(arr);
	let _attendance = temp.map((key) => {
		return {
			years : key.Year,
			attendance : key.Attendance

		}
	});
	let newAtt = _attendance.sort((a,b) => {
		 return b.attendance - a.attendance ;
	})
	console.log(newAtt[0].attendance);
	return newArr;
    
}
Yillar(fifaData,Finaller);


/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(arr, Finaller) {
	
	let finals = Finaller(arr);
    let kazananlar = finals.map(final => 
		{ 
			if(final['Home Team Goals'] > final['Away Team Goals']){
			return final['Home Team Name'];
		} else {
		return final['Away Team Name'];
		}

	});
	let newSet = new Set(kazananlar);
	let kazananlar2= Array.from(newSet);

	console.log(kazananlar2);
	return kazananlar;
	
}



/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(arr, Finaller, Yillar, Kazananlar) {
	
let finals = Finaller(arr);
let years = Yillar(arr, Finaller);
let winners = Kazananlar(arr, Finaller);

let array = [];

for (let i = 0; i < years.length; i++) {
	array.push(`${years[i]} yılında, ${winners[i]} dünya kupasını kazandı!`);
	
}

return array;
}


/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(finals) {
	
    let totalGoals = finals.reduce((acc, item) => {
		return acc + item['Home Team Goals'] + item['Away Team Goals'];
	},0);

	let ortalamaGoal = totalGoals / finals.length;

	return ortalamaGoal.toFixed(2);
	
}



/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

/*

function UlkelerinKazanmaSayilari(fifaData) {
	
	let finalMatchs = fifaData.filter(match => match.Stage === 'Final');

	let winsByCountr = finalMatchs.reduce((acc, current) => {

		let winner = if (current['Home Team Goals'] > current['Away Team Goals']) {
			cur['Home Team Initials'];
		} else {
			cur['Away Team Initials'];
		}
		if (acc[winner]) {
			acc[winner]++;
		} else {
			acc[winner] = 1;
		}

		return acc;

	}, {});

	return winsByCountr;
	
}

*/



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(fifaData) {
		
}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}