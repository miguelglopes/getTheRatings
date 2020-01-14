/*A FAZER:
PRIORITARIOS
-> mais info das seasons (episodios, dia da semana, credit_id, ver season 1 a 1, etc) ir ver nos ajaxs que faco ja la esta info
-> related movies trakttv, tviso related 
-> refazer filmes ecra inicial e lateral sem jssor e fazer load more (de qualquer forma, ja vamos buscar uma data deles no ajax).
-> MUDAR O NOME??? rating nao e isto...
-> se o hash tiver errado dar um erro
-> ver o mobile... remover tudo o que nao funciona no mobile (hover)
-> gravar soundtrack, trailers, behind the scenes e person image
-> adicionar comentarios/discussao a la imdb
-> mudar o search do soundtrack, tem de ter movie/tv para lá
-> clicar no ano e ir para o advanced search desse ano; clicar na sseries e ir para o advanced search de series etc; clicar no genre o mesmo
-> facebook share -> nao da, algo a ver com as hashs
-> meter as abas na horizontal com overflow-x scroll
-> meter episodes mais bonitos
-> css bootstrap parece muito bom....
-> com o embed no tv maze posso obter next episode, last episode, e todos os episodes. acrescentar o que o tmdb nao tiver



OUTROS
-> meter mais origens
-> fazer o que o google manda
-> goodreads api qual e melhor movie ou book
-> pesar numero de votos
-> fazer pag companhia
-> login with imdb/traktv/etc
-> fazer o meu proprio database para os users fazerem login e adicionarem serie s efilmes
-> kickass torrent
-> adicionar bolinhas ao trailer
-> refazer todos os slides sem jssor
-> parental guide
-> redundancia... se o TMDB for a baixo o que faco
-> construir base de dados fazer a database em sql
-> dar para ordenar tudo nas abas
-> o printscreen do feedback ta marado
-> quando os ajax sao aborted a pagina da erro???
	
 */

/****** INITIALDATA ******/
//function initialdata()
//{
	//definir variaveis
	var base_url = "http://image.tmdb.org/t/p/"; //obtive de http://api.themoviedb.org/3/configuration?api_key=MYKEY
	var apikey = "56dc0d4b22d78c87610b733926334344";
	//https://api.tviso.com/auth_token?id_api=3426&secret=9xR7h5qkPr5trufhuszb
	var hash;
	var jaactivounoticias=0;
	var language;
	var jaactivoufilmes=0;
	var numerodescores=10;
	var po_pular={movie:"/popular", tv:"/popular", person: "/popular"};
	var top_rated={movie:"/top_rated", tv:"/top_rated", person: "/popular"};
	var now_playing={movie:"/now_playing", tv:"/on_the_air", person: "/popular"};
	var up_coming={movie:"/upcoming", tv:"/airing_today", person: "/popular"};
	var movieouserie;
	var numsugestoes = 10;
	var nnoticias=10;
	var ecra=3;
	var jafezmovie={en: 0, pt: 0}
	var jafezserie={en: 0, pt: 0}
	var noticiaspt=0;
	var noticiasen=0;
	var downarrow=-1;
	var mediatext;
	var mediabody;
	var h=0;
	var mediaidcast = [];
	var mediaidcrew=[];
	var i=0;
	var vemdoenter=false;
	var datasugestoes={};
	var globalTimeout = 0;
	var seasonsepisodes=[];
	var viewcounterid={ecra0:0, movie:1, tv:2, person:3, unique:4, ecra6:6};
	
	/***** TAMANHOS IMAGENS *****/
	var tamanhoposterfilmes="w154";//  "w92" "w154" "w185" "w342" "w500" "w780" "original"
	var tamanhoinfofilme="w154";
	var tamanhopostersugestoes="w92";
	var tamanhopostercollection="w92";
	var tamanhoactors="w92";
	var tamanhoimagemnoticias=400;
	var tamanhodrop="w780";
	/***** TAMANHOS IMAGENS *****/

	/***** RESIZE ECRA *****/
	var espacoutil;
	var bodyWidth;
	var searchminwidth=300;
	var rodapeminwidth=100;
	var margemsearch=20;
	var margemrodape=40;
	var margemecrainicial=70;
	var espacoparaosfilmes=3/5;
	var espacoutilmin=700;
	var margembarralateral=30;
	var barralateralmin=300;
	var espacoparaosfilmes2;
	/***** RESIZE ECRA *****/

	var existecolecao=false;
	var colecaojafez=false;
	var trailerjafez=false;
	var behindthescenesjafez=false;
	var castjafez=false;
	var seasonsjafez=false;
	var trailerindex=0;
	var behindthescenesindex=0;
	var nobackdrop=false;
	var mudoumovie=0;
	var veiodoback=false;
	var primeiravez=0;
	var ajaxwith_cast=$.Deferred();
	var ajaxwith_crew=$.Deferred();
	var ajaxtrailerfeito=$.Deferred();
	var timeouttime=2000;
	var movieouserieantigo="movie";

	/***** OBJECTS *****/
	var sugestaoas = new Array();
	var popular = new Array();
	for (i = 0; i < numsugestoes; i++)
		popular.push(new Object());
	var nowplaying = new Array();
	for (i = 0; i < numsugestoes; i++)
		nowplaying.push(new Object());
	var upcoming = new Array();
	for (i = 0; i < numsugestoes; i++)
		upcoming.push(new Object());
	var toprated = new Array();
	for (i = 0; i < numsugestoes; i++)
		toprated.push(new Object());
	var filme = new Object();
	var sugestao = new Array();
	sugestao.push(new Object());
	sugestao[0].numsugestoes=5;
	var idcastandcrew = new Object();

	var collection = new Array();
	var jssor_slider1 = new Object();
	var jssor_slider2 = new Object();
	var jssor_slider3 = new Object();
	var jssor_slider4 = new Object();
	var jssor_sliderb = new Object();
	var jssor_sliderc = new Object();
	var bodynoticia = new Array();
	for (i = 0; i < nnoticias; i++)
		bodynoticia.push(new Object());
	var urlimagem = new Array();
	for (i = 0; i < nnoticias; i++)
		urlimagem.push(new Object());
	var titulonoticia = new Array();
	for (i = 0; i < nnoticias; i++)
		titulonoticia.push(new Object());
	var urlnoticia = new Array();
	for (i = 0; i < nnoticias; i++)
		urlnoticia.push(new Object());
	var jafez=new Object();
	var movierow=new Object();
	/***** OBJECTS *****/


	/***** TRADUCOES *****/
	var categoria=[{en: "POPULAR", pt: "POPULAR"}, {en: "TOP RATED", pt: "MELHOR COTAÇÃO"}, {en: "ON THE AIR", pt: "NO AR"}, {en: "AIRING TODAY", pt: "NO AR HOJE"}];//p,tr,np,u 
	var comentarios={en: "Comments", pt: "Comentários"};
	var imfeelingluckytexto={en: "I'm feeling lucky!", pt: "Sinto-me com sorte!"};
	var botaocontent={en:{movie:"Movies", tv:"Series", person:"Person"},pt:{movie:"Filmes", tv:"Séries", person:"Pessoa"}}
	var placeholder={en:"Search for a movie...", pt:"Procure um filme..."};
	var seasons={en:"Seasons", pt:"Temporadas"}
var castandcrew= {actors:[{en:"Actor", pt:"Actor"},{en:"Actors", pt:"Actores"}], writer:[{en:"Writer", pt:"Argumentista"},{en:"Writers", pt:"Argumentistas"}], director:[{en:"Director", pt:"Realizador"},{en:"Directors", pt:"Realizadores"}], othercast:[{en:"Other crew", pt:"Restante Staff"},{en:"Other crew", pt:"Restante Staff"}]};
	var production_companies={en:"Production Company", pt:"Empresa de produção"};
	var release={movie:{en:"Released: ", pt:"Lançamento: "}, tv:{en:"Premiered: ", pt:"Estreia: "}, person:{en:"Birth: ", pt:"Nascimento: "}}
	var languages={movie:{en:"Languages: ", pt:"Idiomas: "}, tv:{en:"Languages: ", pt:"Idiomas: "}, person:{en:"Death: ", pt:"Morte: "}};
	
	var meternotrailer={movie:" movie ", tv:" tv show "};

	var awards={movie:{en:"Awards: ", pt:"Prémios: "}, tv:{en:"Awards: ", pt:"Prémios: "}, person:{en:"Place of Birth: ", pt:"Local de nascimento: "}};
	var boxoffice={en:"Revenue: ", pt:"Receita: "}
	var tipo={movie:{en:"Movie", pt:"Filme"}, tv:{en:"TV Series", pt:"Série"}, person:{en:"Person", pt:"Pessoa"}}
	var informacao={en:"Welcome! This website was created from the necessity of checking scores of movies and series, from different review websites, all in one place. We do not host any content. Feel free to search for a movie ou series.", pt:"Bem vindo! Este website nasceu da necessidade de verificar a cotação de filmes e séries, de diferentes sítios da internet, tudo num mesmo lugar. Não hospedamos nenhum conteúdo. Sinta-se à vontade para pesquisar por um filme ou série."}
	var informacao2={en:"This is our score. It was obtained by averaging the other scores.", pt:"Esta é a nossa cotação. Foi obtida através da média das restantes cotações."}
	var episodeslanguage={en:" episodes", pt:" episódios"}
	var seasonslanguage={en:"Season ", pt:"Temporada "}
	var feedbacktitle={en:"Feedback", pt:"Feedback"}
	var feedbacktitlebody={en:"Click here if you found a bug, want to ask a question or make a suggestion.", pt:"Clica aqui se encontraste um bug, queres fazer uma pergunta ou uma sugestão."}
	var feedbackbody={en:"Feedback is very important to me! If you found a bug all you have to do is choose the subject and submit. A sript will automatically grap all the information necessary for the problem to be solved. Nonetheless, if you want to, feel free to describe the bug. <br> If you want to make a suggestion, please do so in the message field.<br>If you which to be contacted by me, please leave me your e-mail.</div>", pt:"A tua opinião é muito importante para mim! Se encontraste um bug tudo o que tens de fazer é escolher o assunto e submeter! Um script irá automaticamente recolher toda a informação relevante para que o problema possa ser resolvido. <br> Se quiseres fazer uma sugestão, por favor preenche o campo da mensagem. <br>Se desejares ser contactado por mim, por favor deixa-me o teu e-mail."}
	var nameoption={en:"Name (optional)", pt:"Nome (opcional)"} //placeholder
	var email={en:"E-mail (optional)", pt:"E-mail (opcional)"}//placeholder
	var option1={en:"Subject (required)", pt:"Assunto (obrigatório)"}
	var option2={en:"Report Bug", pt:"Reportar Bug"}
	var option3={en:"Suggest Feature", pt:"Sugerir funcionalidade"}
	var option4={en:"Other", pt:"Outro"}
	var message={en:"Message (optional)", pt:"Mensagem (opcional)"}//placeholder
	var afterfeedback={en:"Feedback sent! Thank you very much for your help!", pt:"Feedback enviado! Muito obrigado pela ajuda!"}
	var fbtitlebody={en:"Click here to view or leave a comment", pt:"Clica aqui para ver ou deixar um comentário"}
	var botaosubmeter={en:"Submit", pt:"Submeter"}
	var urlfeednoticias={en: "in", pt: "pt"};//em vez de in pode ser me, za, ap
	var poster_path="poster_path";
	var networks={en:"Network", pt:"Canal de emissão"};
	var budget={en:"Budget: ", pt:"Orçamento: "};
	var created_by={en:"Created by", pt:"Criado por"};
	var othercast={en:"Other Cast", pt:"Outro staff"};
	var arrow = new Object();
	var naofaznada = new Object();
	var traktmovieouserie={movie: "movies", tv: "shows"};
	var netflixmovieouserie={movie: "Movie", tv: "shows"};
	var tvisomovieouserie={2: "movie", 1: "series", 4:"tv-show"};
	var sort_bypossibilities=
	[
			{movie: "popularity.desc", tv: "popularity.desc", pt: "Popularidade", en: "Popularity", id:0},
			{movie: "primary_release_date.desc", tv: "first_air_date.desc", pt: "Data (decrescente)", en: "Date (descending)", id:1},
			{movie: "primary_release_date.asc", tv: "first_air_date.asc", pt: "Data (crescente)", en: "Date (ascending)", id:2}
	];
	var releasedatesearch=
		{
			greater:
			{
				tv:"&first_air_date.gte=", movie: "&primary_release_date.gte="
			},
			lower:
			{
				tv:"&first_air_date.lte=", movie: "&primary_release_date.lte="
			}
		};
	var sort_by = {name: "popularity.desc", id: 0};
	var with_genres="";
	var with_castnames="";
	var with_crewnames="";
	var gy="";
	var ly="";
	var release_date={movie:"release_date", tv:"first_air_date"};
	var vote_average="vote_average";
	var original_title={movie: "original_title", tv: "original_name", person:"name"};
	var titleaqui={movie: "title", tv: "name", person:"name"};
	var overview="overview";
	var runtime={movie: "runtime", tv: "episode_run_time"};
	var year={movie:{pt:"anomoviept", en:"anomovieen"}, tv:{pt:"anotvpt", en:"anotven"}};
	var identificacao={movie:{pt:"identificacaomoviept", en:"identificacaomovieen"}, tv:{pt:"identificacaotvpt", en:"identificacaotven"}};
	var genresname={movie:{pt:"genresnamemoviept", en:"genresnamemovieen"}, tv:{pt:"genresnametvpt", en:"genresnametven"}};
	var posterpath={movie:{pt:"posterpathmoviept", en:"posterpathmovieen"}, tv:{pt:"posterpathtvpt", en:"posterpathtven"}};
	var title={movie:{pt:"titulomoviept", en:"titulomovieen"}, tv:{pt:"titulotvpt", en:"titulotven"}};
	
	/***** GENEROS *****/
	var generos=[{"id":28,"en":"Action","pt":"Acção"},{"id":12,"en":"Adventure","pt":"Aventura"},{"id":16,"en":"Animation","pt":"Animação"},{"id":35,"en":"Comedy","pt":"Comédia"},{"id":80,"en":"Crime","pt":"Crime"},{"id":99,"en":"Documentary","pt":"Documentário"},{"id":18,"en":"Drama","pt":"Drama"},{"id":10751,"en":"Family","pt":"Família"},{"id":14,"en":"Fantasy","pt":"Fantasia"},{"id":10769,"en":"Foreign","pt":"Estrangeiro"},{"id":36,"en":"History","pt":"História"},{"id":27,"en":"Horror","pt":"Terror"},{"id":10402,"en":"Music","pt":"Música"},{"id":9648,"en":"Mystery","pt":"Mistério"},{"id":10749,"en":"Romance","pt":"Romance"},{"id":878,"en":"Science Fiction","pt":"Ficção Científica"},{"id":10770,"en":"TV Movie","pt":"Cinema TV"},{"id":53,"en":"Thriller","pt":"Thriller"},{"id":10752,"en":"War","pt":"Guerra"},{"id":37,"en":"Western","pt":"Faroeste"},{"id":10768,"en":"War & Politics","pt":"Guerra e Política"},{"id":10767,"en":"Talk","pt":"Conversa"},{"id":10766,"en":"Soap","pt":"Novela"},{"id":10759,"en":"Action & Adventure","pt":"Acção e Aventura"},{"id":10762,"en":"Kids","pt":"Infantil"},{"id":10763,"en":"News","pt":"Notícias"},{"id":10764,"en":"Reality","pt":"Realidade"},{"id":10765,"en":"Sci-Fi & Fantasy","pt":"Ficção Científica e Fantasia"}]

//} 
 
 
/****** INICIALIZAR ******/
$(document).ready(
	function ()
	{	
		//RESIZE
		showhide(3);//esconde tudo
		$("#loadingscreen").show();	
		///*			
		//CHECK HASH
		hash = window.location.hash.substring(1);
		hasharray=hash.split('/');
		console.log("HASH:"+hasharray)
		if(!hasharray[0])
		{
			ecra=0;
			console.log("nao tinha hash")
			//forcar change dos botoes para assign da info correta
			cookiesiniciais();	
			assinginitialinfofuncao();//funcaomovie e funcaoen e actualizaroscampos	
			history.replaceState({homepage: true, language: language, movieouserie: movieouserie}, null, "#"+language+"/"+movieouserie);
		}
		else
		{
			language=hasharray[0];
			movieouserie=hasharray[1];
			//forcar change dos botoes para assign da info correta
			assinginitialinfofuncao();//funcaomovie e funcaoen e actualizaroscampos 	
			
			//ecra1
			if(hasharray.length==3)
			{
				console.log("tinha hash ecra1")	
				filme.tmdbid=hasharray[2];
				ecra=1;
				infodofilmefuncao();			
			}
			else if(hasharray.length==8)
			{
				console.log("tinha hash ecra6")	
				gy=hasharray[2];
				ly=hasharray[3];						
				sort_by.id=hasharray[4];
				with_genres=hasharray[5];
				castas=hasharray[6];
				crewas=hasharray[7];
				advancedsearchfuncao();
			}
			else if(hasharray.length==2)
			{
				console.log("tinha hash ecra0")	
				ecra=0;
			}
		}

		//geraopcoesiniciais
		geraropcoesiniciais();
			
		//noticias
		actualizaafeed();
		
		//ecrainiciiallateral
		ecrainiciallateralfuncao();
		
		//SE CLICA
		seclica();
		
		//resize
		$(window).bind("resize", resizeecra);
		
		//funcaoguardalogs
		//funcaoqueguardatodososlogs();
		
		seclicapessoa("tv");
		seclicapessoa("movie");
		
		primeiravez=1;
		//*/
		welcomemessage();
	}
)

/**** SETCOOKIEDATESTR ****/
function setCookiedatestr(cname, cvalue, dateexpiration) {
    var expires = "expires="+dateexpiration.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

/***** SHOWHIDE *****/
showhide = function (i) 
{
	console.log("showhide"+i)
	//aparece o abaixodosearch
	if (i == 1) 
	{
		ecra=1;
				
		//ecrainicial
		$('#ecrainicial').hide();

		//abaixodosearch
		$('#abaixodosearch').show();
		
		//advancedsearch
		$('#advancedsearchecra').hide();
		$('#advancedsearchdiv').hide();
		
		//sugestoes
		$('#sugestoes').hide();
		$('#sugestoesenter').hide();
		
		//rodape
		$('#rodapebody').hide();
		$('#afterfeedback').hide();
		
		$("#abasbodydiv").hide();
		$("#abasbodydiv>div").hide();
		$("#abastitulosdiv>div").removeClass("hvr-growhover");
		if(!nobackdrop)
		{
			$("#backdropabas").show();
			$("#abasbodydiv").show();
		}
		
		if(primeiravez)
		{
			resizeecra();
		}
		$("#loadingscreen").hide();
		if(!veiodoback)
		{
			window.history.pushState({language: language, movieouserie: movieouserie, tmdbid: filme.tmdbid}, null, "#"+language+"/"+movieouserie+"/"+filme.tmdbid);
		}
		veiodoback=false;
		$("#info").scrollintoview({
			duration: 2000,
			direction: "both",
			complete: function() {
				// highlight the element so user's focus gets where it needs to be
			}
		});
		contavisitante(viewcounterid[movieouserie]);
	}
	//aparece ecra inicial
	else if (i==0)
	{
		ecra=0;						
		//ecrainicial
		$('#ecrainicial').show();

		//abaixodosearch
		$('#abaixodosearch').hide();
		
		//advancedsearch
		$('#advancedsearchecra').hide();
		$('#advancedsearchdiv').hide();
		
		//sugestoes
		$('#sugestoes').hide();
		$('#sugestoesenter').hide();
		
		//rodape
		$('#rodapebody').hide();
		$('#afterfeedback').hide();
		
		if(primeiravez)
		{
			resizeecra();
		}
		$("#loadingscreen").hide();
		contavisitante(viewcounterid["ecra0"]);
	}
	//esconde tudo
	else if (i==3)
	{
		ecra=3;
		//videoexterior
		$('#videoexterior').hide();
		$('#loadingscreen').hide();
		
		//ecrainicial
		$('#ecrainicial').hide();

		//abaixodosearch
		$('#abaixodosearch').hide();
		
		//advancedsearch
		$('#advancedsearchecra').hide();
		$('#advancedsearchdiv').hide();
		
		//sugestoes
		$('#sugestoes').hide();
		$('#sugestoesenter').hide();
		
		//rodape
		$('#rodapebody').hide();
		$('#afterfeedback').hide();
		
		resizeecra();
	}
	
	//advancedsearch
	else if (i==6)
	{
		ecra=6;
			
		//ecrainicial
		$('#ecrainicial').hide();

		//abaixodosearch
		$('#abaixodosearch').hide();
		
		//advancedsearch
		$('#advancedsearchecra').show();
		$('#advancedsearchdiv').show();
		
		//sugestoes
		$('#sugestoes').hide();
		$('#sugestoesenter').hide();
		
		//rodape
		$('#rodapebody').hide();
		$('#afterfeedback').hide();
		
		//history
		if(!veiodoback)
		{
			window.history.pushState({language: language, movieouserie: movieouserie, gy: gy, ly:ly, sort_by: sort_by.id, with_genres: with_genres, castas: castas, crewas: crewas}, null, "#"+language+"/"+movieouserie+"/"+gy+"/"+ly+"/"+sort_by.id+"/"+with_genres+"/"+castas+"/"+crewas);
		}
		veiodoback=false;
		
		if(primeiravez)
		{
			resizeecra();
		}
		$("#loadingscreen").hide();
		contavisitante(viewcounterid["ecra6"]);
	}
	console.log("FIM showhide"+i)
}


/**** RESIZEECRA ****/
function resizeecra()
{
	console.log("resizeecra"+ecra)
	//searchbarmaissugestions
	bodyWidth = document.body.clientWidth;
	bodyHeight = document.body.clientHeight;
	
	//cabecalho
	l1=$( "#titulomaisquestion" ).width();
	dif=bodyWidth-l1-margemsearch;
	if(dif<searchminwidth)
		dif=bodyWidth-margemsearch;
	$( "#searchmaisbotoes" ).width(dif);
	$( "#sugestoes" ).width(dif);
	
	//rodape
	dif=bodyWidth/4-margemrodape;
	if(dif<rodapeminwidth)
		dif=bodyWidth-margemrodape;
	$( ".rodapeitem" ).width(dif);
		
	if (ecra==0)
	{
		console.log("Scalefilmes")
		espacoutil=bodyWidth-margemecrainicial;
		espacoparaosfilmes=3/5;
		espacoparaosfilmes2=espacoparaosfilmes;
		if (espacoutil<=espacoutilmin)
		{
			espacoutil=bodyWidth-margemecrainicial;
			espacoparaosfilmes=1;
			espacoparaosfilmes2=0;
		}
		jssor_slider1.$ScaleWidth(espacoutil*espacoparaosfilmes);
		jssor_slider2.$ScaleWidth(espacoutil*espacoparaosfilmes);
		jssor_slider3.$ScaleWidth(espacoutil*espacoparaosfilmes);
		jssor_slider4.$ScaleWidth(espacoutil*espacoparaosfilmes);
		jssor_sliderb.$ScaleWidth(espacoutil*(1-espacoparaosfilmes2)+17);
		//facebook
		$("#fbdiv").width(espacoutil*(1-espacoparaosfilmes2));

		console.log("FIM Scalefilmes")
	}
	else if(ecra==1)
	{
		//TRAILER
		$("#trailerexterior").width(bodyWidth*0.80)
		$("#trailerexterior").height(bodyWidth*0.80*0.5625)
	
		//ecralateral
		l1=$( "#info" ).outerWidth();
		dif=bodyWidth-l1-margembarralateral;
		if(dif<barralateralmin)//vai pa linha de baixo
		{
			dif=l1;
		}
		jssor_sliderc.$ScaleWidth(dif);
		$('.filmesdivlateral').perfectScrollbar('update');
							
		//MUSIC
		l1=$("#abasbodydiv").width();
		$("#musiciframe").width(l1)
		$("#musiciframe").height(l1*0.5625)

	}
	else if (ecra==6)
	{
	}
	
	console.log("FIM resizeecra"+ecra)
}

/***** COOKIESINICIAIS *****/
cookiesiniciais = function()
{
	//language
	if (!getCookie("language"))
	{
		console.log("nocookie language")
		setCookiedays("language", "en", 10*365)
		language="en";

	}
	else
	{
		language=getCookie("language");
		console.log("ha cookie language: "+language);
	}
	
	//movieouserie
	if (!getCookie("movieouserie"))
	{
		console.log("nocookie movieouserie")
		setCookiedays("movieouserie", "movie", 10*365)
		funcaomovie();
	}
	else
	{
		movieouserie=getCookie("movieouserie");
		console.log("ha cookie movieouserie: "+movieouserie);
	}
}

/**** GETCOOKIE ****/
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

/**** SETCOOKIEDAYS ****/
function setCookiedays(cname, cvalue, dateexpiration) {
    var d = new Date();
	d.setTime(d.getTime() + dateexpiration*24*60*60*1000);
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

/***** ASSINGINITIALINFOFUNCAO *****/
function assinginitialinfofuncao()
{
	console.log("assinginitialinfofuncao")
	if(language=="en")
	{
		document.getElementById("checkboxen").checked=false;
		language="en";	
	}
	else if(language=="pt")
	{
		document.getElementById("checkboxen").checked=true;
		language="pt";
	}
	if(movieouserie=="movie")
	{
		funcaomovie();
	}
	else if(movieouserie=="tv")
	{
		funcaoserie();
	}
	else if(movieouserie=="person")
	{
		funcaoperson();
	}
	
	actualizarcampos();
	semudamovie();
	semudalingua();
	//advancedsearch
	advancedsearchgeneratefields();
	console.log("FIM assinginitialinfofuncao")
}

/**** FUNCAOMOVIE ****/
function funcaomovie()
{
	console.log("funcaomovie")
	movieouserie="movie";
	movieouserieantigo=movieouserie;
	$("#mosmovie").prop('checked', true);
	//
	categoria=[{en: "POPULAR", pt: "POPULAR"}, {en: "TOP RATED", pt: "MELHOR COTAÇÃO"}, {en: "NOW PLAYING", pt: "NO CINEMA"}, {en: "UPCOMING", pt: "EM BREVE"}];//p,tr,np,u 
	placeholder={en:"Search for a movie...", pt:"Procure um filme..."};	
	//
	$("#castasdiv").show();
	$("#crewasdiv").show();
		console.log("FIM funcaomovie")
		console.log("movieouserieantigo: movie :"+movieouserieantigo)
}

/**** FUNCAOSERIE ****/
function funcaoserie()
{
	console.log("funcaoserie")
	movieouserie="tv";
	movieouserieantigo=movieouserie;
	$("#mostv").prop('checked', true);
	//
	categoria=[{en: "POPULAR", pt: "POPULAR"}, {en: "TOP RATED", pt: "MELHOR COTAÇÃO"}, {en: "ON THE AIR", pt: "NO AR"}, {en: "AIRING TODAY", pt: "NO AR HOJE"}];//p,tr,np,u 
	placeholder={en:"Search for a TV series...", pt:"Procure uma série..."};
	
	//
	$("#castasdiv").hide();
	$("#crewasdiv").hide();
	console.log("FIM funcaoserie")
	console.log("movieouserieantigo: serie :"+movieouserieantigo)
}

/**** FUNCAOPERSON ****/
function funcaoperson()
{
	console.log("funcaoperson")
	if(movieouserie!="person")
	{
		movieouserieantigo=movieouserie;
	}
	movieouserie="person";
	$("#mosperson").prop('checked', true);
	if(movieouserieantigo=="movie")
	{
		$("#castasdiv").show();
		$("#crewasdiv").show();
	}
	else
	{
		$("#castasdiv").hide();
		$("#crewasdiv").hide();
	}
	console.log("FIM funcaoperson")
	console.log("movieouserieantigo: person :"+movieouserieantigo)
}

/**** ACTUALIZARCAMPOS ****/
actualizarcampos=function()
{
	console.log("actualizarcampos")
	$('#categoriapopular').text(categoria[0][language]);
	$('#categoriatoprated').text(categoria[1][language]);
	$('#categorianowplaying').text(categoria[2][language]);
	$('#categoriaupcoming').text(categoria[3][language]);
	$('div.jssort14:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)').text(categoria[0][language]);
	$('div.jssort14:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)').text(categoria[1][language]);
	$('div.jssort14:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)').text(categoria[2][language]);
	$('div.jssort14:nth-child(1) > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)').text(categoria[3][language]);//ecralateraltitulo
	$('#fbtitle').text(comentarios[language]);
	$('#imfeelinglucky').text(imfeelingluckytexto[language]);
	$('#mosmovie').text(botaocontent[language]["movie"]);
	$('#mosperson').text(botaocontent[language]["person"]);
	$('#mosserie').text(botaocontent[language]["tv"]);
	$('#movie').attr("placeholder", placeholder[language]);
	$('#informacao').text(informacao[language]);
	$('#informacao2').text(informacao2[language]);
	$('#feedbacktitulo').text(feedbacktitle[language]);
	$('#feedbacktitlebody').text(feedbacktitlebody[language]);
	$('#feedbackbodytext').html(feedbackbody[language]);
	$('#nameoption').attr("placeholder", nameoption[language]);
	$('#email').attr("placeholder",email[language] );
	$('#message').attr("placeholder",message[language] );
	$('#option1').text(option1[language]);
	$('#option2').text(option2[language]);
	$('#option3').text(option3[language]);
	$('#option4').text(option4[language]);
	$('#afterfeedback').text(afterfeedback[language]);
	$('#fbtitlebody').text(fbtitlebody[language]);
	$('#botaosubmeter').val(botaosubmeter[language]);
	$('#budgettitulo').text(budget[language]);
	//$('#trailertitle').text(trailertitle[movieouserie][language])
	console.log("FIM actualizarcampos")
}

/**** SEMUDAMOVIE ****/
function semudamovie()
{
	$(".mosselect").change
	(
		function() 
		{
			console.log("semudamovie")
			movieouserie=$("input[name=mosbutton]:checked").val();
			if(movieouserie=="tv") 
			{
				funcaoserie();
			}
			else if(movieouserie=="movie")
			{
				funcaomovie();
			}
			else if(movieouserie=="person")
			{
				funcaoperson();
			}
			mudoumovie=mudoumovie+1;
			setCookiedays("movieouserie", movieouserie, 10*365);
			actualizarcampos();
			geraropcoesiniciais();
			console.log("FIM semudamovie")
		}
	);
}

/**** SEMUDALINGUA ****/
function semudalingua()
{	
	$("#checkboxen").change
	(
		function() 
		{
			console.log("semudalingua")
			if(this.checked) 
			{
				language="pt";
			}
			else
			{
				language="en";	
			}
			setCookiedays("language", language, 10*365);
			actualizarcampos();
			geraropcoesiniciais();
			actualizaafeed();
			advancedsearchgeneratefields();
			if( $("#abaixodosearch").is(':visible') && mudoumovie==0)
			{
				$("#loadingscreen").show();
				infodofilmefuncao();
			}
			else
			{
			}
			console.log("FIM semudalingua")
			
		}
	);
}

/**** ADVANCEDSEARCHGENERATEFIELDS ****/
advancedsearchgeneratefields = function(){
	//criar no html os generos
	$("#selectgenre").empty();
	$("#selectgenre").append('<option value="" id="genremenos1"> All </option>');
	for(i=0; i<generos.length; i++)
	{
		$("#selectgenre").append('<option value="'+ generos[i].id +'" id="genre' + i + '">' + generos[i][language] + '</option>');
	}
	
	//criar no html o sort
	$("#selectsort").empty();
	for(i=0; i<sort_bypossibilities.length; i++)
	{
		$("#selectsort").append('<option value="'+ sort_bypossibilities[i].id +'" id="sortby' + i + '">' + sort_bypossibilities[i][language] + '</option>');
	}
	
	$("#castas").val(with_castnames);
	$("#crewas").val(with_crewnames);
	$("#greateryear").val(gy);
	$("#loweryear").val(ly);
	$("#selectgenre").val(with_genres);
	$("#selectsort").val(sort_by.id);
}

/** FUNCAOPALAVRAAPESQUISARMINIMIZADA **/
function funcaopalavraapesquisarminimizada(palavraapesquisarminimizada)
{
	var variaspalavras=palavraapesquisarminimizada.split(' ');
	if(variaspalavras.length <=1)
	{
		return palavraapesquisarminimizada;
	}
	else
	{
		return variaspalavras[0]+" "+variaspalavras[1].substring(0, 1);
	}
	
	
}

/***** INFODOFILMEFUNCAO *****/
infodofilmefuncao = function () 
{
	console.log("infodofilmefuncao")
	cleaneverything();
	console.log(filme.tmdbid)
	/*****************************************************************************************************
	************************************/
	$.ajax({
		url: '/php/media/media_checkrow_retrieve.php',  //Server script to process data
		type: 'POST',
		dataType: 'json',
		data: {
			language: language,
			id: filme.tmdbid,
			mediatype:movieouserie
		},
		success: function(data){
			movierow=data;
			//ISTO E PAA SAIR
			//filme.omdbid = movierow.MImdbId;
			filme.posterpath = movierow.MPp;
			filme.backdrop_path=movierow.MBp;
			filme.tmdb = Number(movierow.MVaTmdb);
			filme.resumo = movierow.MO;
			filme.release = movierow.MRd;
			filme.title = movierow.MN;
			if(!movierow.MN)
				filme.title = movierow.MOn;
			filme.original_title = movierow.MOn;
			filme.year = movierow.MY;
			filme.urloriginal = movierow.MH;
			filme.status=movierow.MS;
			filme.boxoffice = movierow.MR;
			filme.budget = movierow.MB;
			filme.tagline=movierow.MTl;
			
			//filme.tvdbid = movierow.MTvdbId;
			//filme.lastairdate=movierow.last_air_date;
			if(movierow.CTmdbId)
			{
				collection.push(new Object());
				collection[0].id=movierow.belongs_to_collectiontmdb;
				existecolecao=true;
			}
			filme.meta = Number(movierow.MVaMeta);
			filme.DVD=movierow.MDv;
			filme.imdb = Number(movierow.MVaImdb);
			filme.rotten = Number(movierow.MVaRor);
			filme.rottenusers = Number(movierow.MVaRour);
			filme.rated = movierow.MRa;
			filme.awards = movierow.MAw;			
			filme.trakt = Number(movierow.MVaTrakt);		
			filme.tviso = Number(movierow.MVaTviso);
			//filme.tvisoid=movierow.MTvisoId;
			//filme.tvisomediaType=movierow.mediaTypetviso;
			filme.netflix = Number(movierow.MVaNflix);
			//filme.netflixid=movierow.show_idnetflix;
			//filme.airdayofweek=movierow.airs_dayofweektvdb;
			//filme.airtime=movierow.airs_timetvdb;
			filme.tvdb=Number(movierow.MVaTvdb);		
			filme.tvmaze = Number(movierow.MVaTvmaze);
			//filme.tvmazeid = movierow.idtvmaze;
			filme.tvmazeurl=movierow.MUTvmaze;
			filme.tmdburl=movierow.MUTmdb;
			filme.omdburl=movierow.MUImdb;
			filme.tvdburl=movierow.MUTvdb;
			filme.nflixurl=movierow.MUNflix;
			filme.tvisourl=movierow.MUTviso;
			filme.rottenurl=movierow.MURo;
			filme.metaurl=movierow.MUMe;
			filme.trakturl=movierow.MUTrakt;
			filme.timezone=movierow.MT;
			filme.tempoduracao = movierow.runtime.join(",");
			filme.pais=movierow.paises.join(",");
			if(!filme.pais)
				filme.pais=data.MPb;
			filme.languages=movierow.linguas.join(", ");
			if(!filme.languages)
				filme.languages=data.MDd;
			filme.genero = movierow.generos.join(", ");
			assignmovieinfo()
		}
	});
}

/*** GENEROSFUNCAO ***/
generosfuncao = function(data, i, results)
{
	//console.log("generos")
	genresnamefuncao="";
	var genresid = [];
	if(i>=0)
	{
		genresid = data[results][i].genre_ids;
	}
	else
	{
		for (k = 0; k < data.genrestmdb.length; k++) 
		{
			genresid[k] = data.genrestmdb[k].id;
		}
	}
	for (k = 0; k < genresid.length; k++) 
	{
		for (m = 0; m < generos.length; m++) 
		{
			if (genresid[k] == generos[m].id) 
			{
				genresnamefuncao = generos[m][language] + ", " + genresnamefuncao;
			}
		}
	}
	genresnamefuncao = genresnamefuncao.substring(0, genresnamefuncao.length-2);
	//console.log("FIM generos")
	return genresnamefuncao;
}

/** CAPITALIZEFIRSTLETTER **/
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function ajaxtvmazefuncaonextepisode()
{
	$.ajax({
		url : filme.tvmazenextepisode,
		dataType : 'json',
		//async : false,
		success : function (data) {
			if(data)
				filme.nextairdate=data.airstamp;
			
			console.log("dentro ajax next episode:"+filme.nextairdate)
		},
		complete: function()
		{
			if(!filme.nextairdate)
				$('#nextairdatetitulo, #nextairdate').hide();
			else
			{
				$('#nextairdatetitulo, #nextairdate').show();
				$('#nextairdate').text(filme.nextairdate);
			}	
		},
		error : function(){
			console.log("ended ajaxtvmazenextepisode ajax error")
		}
		//,timeout: timeouttime // sets timeout to 3 seconds
	})
}

function ajaxtvmazefuncaopreviousepisode()
{
	$.ajax({
		url : filme.tvmazepreviousepisode,
		dataType : 'json',
		//async : false,
		success : function (data) {
			if(data)
				filme.lastairdate=data.airstamp;
			console.log("dentro ajax next episode:"+filme.lastairdate)
		},
		complete: function()
		{
			if(!filme.lastairdate)
				$('#lastairdatetitulo, #lastairdate').hide();
			else
			{
				$('#lastairdatetitulo, #lastairdate').show();
				$('#lastairdate').text(filme.lastairdate);
			}	
		},
		error : function(){
			console.log("ended ajaxtvmaze lastepisode ajax error")
		}
		//,timeout: timeouttime // sets timeout to 3 seconds
	})
}

/** ASSIGNMOVIEINFO **/
//assign movie info
assignmovieinfo = function () 
{
	console.log("ajax assignmovieinfo")
	n = numerodescores;
	var notreleasedyet={en:"Careful! This " + tipo[movieouserie][language] + " was not released yet. The scores may not be representative.", pt: "Atenção! Este " + tipo[movieouserie][language] + " ainda não saiu. As cotações poderão não ter significado."}
	var noscores={en:"There are no scores for this "+ tipo[movieouserie][language] + ".", pt: "Não há cotações para este " + tipo[movieouserie][language] + "."}
	
	//search placeholder
	$("#movie").val(filme.title);
	
	//TABIMAGEM
	//posterpath
	if(!filme.posterpath)
	{
		$('#poster').attr("src", "../img/noposter.png"); 
	}
	else
	{
		$('#poster').attr("src", filme.posterpath.replace("wsize", tamanhoinfofilme)); 
	
	}
	//release
	if(!filme.release)
	{
		$('#releasediv').hide();
	}
	else
	{
		$('#releasediv').show();
		$('#releasetitulo').text(release[movieouserie][language]);
		$('#release').text(filme.release);
	}
	//languages
	if(!filme.languages)
	{
		$('#languagesdiv').hide();
	}	
	else
	{
		$('#languagesdiv').show();
		$('#languagestitulo').text(languages[movieouserie][language]);
		$('#languages').text(filme.languages);
	}
	//awards
	if(!filme.awards  || filme.awards=="N/A")
	{
		$('#awardsdiv').hide();	
	}
	else
	{
		$('#awardsdiv').show();
		$('#awardstitulo').text(awards[movieouserie][language]);
		$('#awards').text(filme.awards);
	}
	//boxoffice
	if(!filme.boxoffice || movieouserie!="movie" || filme.boxoffice=="N/A")
	{
		$('#boxofficediv').hide();
	}
	else
	{
		$('#boxofficediv').show();
		$('#boxofficetitulo').text(boxoffice[language]);
		$('#boxoffice').text(parseFloat((filme.boxoffice/1000000).toPrecision(1))+"M$");
	}
	//budget
	if(!filme.budget || movieouserie!="movie" || filme.budget=="N/A")
	{
		$('#budgetdiv').hide();
	}
	else
	{
		$('#budgetdiv').show();
		$('#budgettitulo').text(budget[language]);
		$('#budget').text(parseFloat((filme.budget/1000000).toPrecision(1))+"M$");
	}
	//boxoffice
	if(!filme.DVD || filme.DVD =="N/A")
	{
		$('#dvddiv').hide();
	}
	else
	{
		$('#dvddiv').show();
		//$('#dvdtitulo').text(dvd[language]);
		$('#dvd').text(filme.DVD);
	}
	
	//TABTITLE
	//title
	if(!filme.title)
	{
		$('#title').text("N/A")
	}
	else
	{
		$('#title').text(filme.title);
		console.log("title: "+filme.title)
		console.log("tmdbid: "+filme.tmdbid)
	}
	//year
	if(!filme.year)
	{
		$('#year').hide();
	}
	else
	{
		$('#year').show();
		$('#year').text("  (" + filme.year + ")");
	}
	//urloriginal
	if(!filme.urloriginal || filme.urloriginal=="NA" || filme.urloriginal=="N/A")
	{
		$('#urloriginal').attr("href", "javaScript:void(0);");
		$('#urloriginal').attr("target", "_self");
		$('#urloriginal').css('cursor', 'default');
	}
	else
	{
		$('#urloriginal').attr("href", filme.urloriginal);
		$('#urloriginal').attr("target", "_blank");
		$('#urloriginal').css('cursor', 'pointer');
	}
	//type
	$('#type').text(tipo[movieouserie][language]+"  |  ");
	//pais
	if(!filme.pais)
	{
		$('#pais').hide();
	}
	else
	{
		$('#pais').text(filme.pais+"  |  ");
		$('#pais').show();
	}
	//genero
	if(!filme.genero)
	{
		$('#genero').hide();
	}
	else
	{
		$('#genero').show();
		$('#genero').text(filme.genero);
	}
	//rated
	if(!filme.rated || filme.rated=="N/A")
	{
		$('#rated').hide();
		$('#ratedtext').hide();
	}
	else
	{
		if(filme.rated=="UNRATED")
		{
			filme.rated="NOT RATED";
		}
		if(filme.rated=="GP" || filme.rated=="APPROVED" || filme.rated=="PASSED")
		{
			filme.rated="G";
		}
		$('#ratedtext').text("  |  ");
		$('#ratedtext').show();
		$('#rated').show();
		$('#rated').attr("src", "../img/" + filme.rated + ".png");
		$('#rated').css("opacity", "0.4");
	}
	//runtime
	if(!filme.tempoduracao || filme.tempoduracao=="")
	{
		$('#runtime').hide();
	}
	else
	{
		$('#runtime').text(filme.tempoduracao + " min  |  ");
		$('#runtime').show();
	}
	
	
	//resumo
	if(!filme.resumo || filme.resumo=="N/A")
	{
		$('#resumo').hide();
	}
	else
	{
		naofaznada.resumo=false;
		$('#resumo').css('cursor', 'default');
		funcaodiminuirresumo();
		$('#resumo').html(filme.resumo);
		$('#maisresumo').hide();
		$('#resumo').show();
	}
	//seasons
	if(movieouserie!="tv")
	{
		$('#seasonstitle').hide()
	}
	else
	{
		$('#seasonstitle').show()
	}	
	
	//RATINGS
	//imdblink
	if (!filme.imdb)
	{
		filme.imdb = 0;
		filme.imdbvotes = 0;
		n = n - 1;
		$('#imdblink').hide();
	}
	else 
	{
		$('#imdblink').show();
		$('#imdblink').attr("href",filme.omdburl);
	}

	//rottenlink
	if (!filme.rotten)
	{
		filme.rotten = 0;
		filme.rottenvotes = 0;
		n = n - 1;
		$('#rottenlink').hide();
		
	} 
	else 
	{
		$('#rottenlink').show();
		$('#rottenlink').attr("href", filme.rottenurl);
	}
	//rottenuserslink
	if (!filme.rottenusers) 
	{
		filme.rottenusers = 0;
		filme.rottenusersvotes = 0;
		n = n - 1;
		$('#rottenuserslink').hide();
	} 
	else 
	{
		$('#rottenuserslink').show();
		$('#rottenuserslink').attr("href", filme.rottenurl);
	}		
			
	//metalink
	if (!filme.meta)
	{
		filme.meta = 0;
		filme.metavotes = 0;
		n = n - 1;
		$('#metalink').hide();
	} 
	else
	{
		$('#metalink').show();
		$('#metalink').attr("href", filme.metaurl);
	}
	//tmdblink
	if (!filme.tmdb)
	{
		filme.tmdb = 0;
		filme.tmdbvotes = 0;
		n = n - 1;
		$('#tmdblink').hide();
	} 
	else
	{
		$('#tmdblink').show();
		$('#tmdblink').attr("href", filme.tmdburl);
	}
	//tvdblink
	if (!filme.tvdb)
	{
		filme.tvdb = 0;
		filme.tvdbvotes = 0;
		n = n - 1;
		$('#tvdblink').hide();
	}
	else 
	{
		$('#tvdblink').show();
		$('#tvdblink').attr("href", filme.tvdburl);
	}
				
	//tvmazelink
	if (!filme.tvmaze)
	{
		filme.tvmaze = 0;
		filme.tvmazevotes = 0;
		n = n - 1;
		$('#tvmazelink').hide();
	}
	else 
	{
		$('#tvmazelink').show();
		$('#tvmazelink').attr("href", filme.tvmazeurl);
	}
	//trakt
	if (!filme.trakt)
	{
		filme.trakt = 0;
		filme.traktvotes = 0;
		n = n - 1;
		$('#traktlink').hide();
	}
	else 
	{
		$('#traktlink').show();
		$('#traktlink').attr("href", filme.trakturl);
	}
	//tviso
	if (!filme.tviso)
	{
		filme.tviso = 0;
		filme.tvisovotes = 0;
		n = n - 1;
		$('#tvisolink').hide();
	}
	else 
	{
		$('#tvisolink').show();
		$('#tvisolink').attr("href", filme.tvisourl);
	}
	//netflix
	if (!filme.netflix)
	{
		filme.netflix = 0;
		filme.netflixvotes = 0;
		n = n - 1;
		$('#netflixlink').hide();
	}
	else 
	{
		$('#netflixlink').show();
		$('#netflixlink').attr("href", filme.nflixurl);
		//"http://www.netflix.com/title/"+filme.netflixid
	}
	//average e aviso
	filme.average = Math.round((filme.meta + filme.imdb + filme.rotten + filme.rottenusers + filme.tmdb+filme.tvdb+filme.tvmaze+filme.trakt+filme.netflix+filme.tviso) / n);
	console.log(filme.average)
	if(!filme.average)
	{
		if(movieouserie!="person")
		{
			$('#aviso').text(noscores[language]);
			$('#aviso').show();
		}
		$('#averagelink').hide();
	}
	else
	{
		$('#averagelink').show();
		$('#aviso').hide();
	}
	
	//status
	if(!filme.status || movieouserie=="person")
	{
		$('#status').hide();
	}
	else
	{
		$('#status').text("  |  "+filme.status);
		$('#status').show();
		datarelease=new Date(filme.release);
		datahoje=new Date();
		if(datarelease>datahoje)
		{
			$('#aviso').text(notreleasedyet[language]);
			$('#aviso').show();
		}
	}
	
	nobackdrop=false;
	if(!filme.backdrop_path)
	{
		$('#backdropabas').hide();
		nobackdrop=true;
	}
	else
	{
		$('#backdropabas').css("background", "transparent url(" + filme.backdrop_path.replace("wsize", tamanhodrop) + ") center center no-repeat");
		$('#backdropabas').css("background-size", "cover");
		$('#backdropabas').show();
		if(!filme.tagline)
		{
			$('#backdropabas').text("");
		}
		else
		{
			$('#backdropabas').text(filme.tagline);
		}
	}
//$('#s' + (i + 1)+'2'.toString()).css("background-size", "auto 60px");


	
	//TRAILER
	$("#trailer").remove();

	//COLECOES
	if(!existecolecao)
	{
		$('#colecoestitle').hide();
	}
	else
	{
		$('#colecoestitle').show();
	}
	
	//cast abas
	if(movieouserie=="movie" || movieouserie=="tv")
	{
		$('#casttitle').show();
		$('#trailertitle').show();
	}
	else
	{
		$('#casttitle').hide();
		$('#trailertitle').hide();
	}
	
	$('#behindthescenestitle').show();
	
	//movie e serie abas
	if(movieouserie=="person")
	{
		$('#movietitle').show();
		$('#tvtitle').show();
	}
	else
	{
		$('#movietitle').hide();
		$('#tvtitle').hide();
	}
	
	if(movieouserie=="movie" || movieouserie=="tv")
	{
		$('#musictitle').show();
	}
	else
	{
		$('#musictitle').hide();
	}

	showhide(1);
	//actualiza scores
	window.randomize(filme.netflix, 10);
	window.randomize(filme.tviso, 9);
	window.randomize(filme.trakt, 8);
	window.randomize(filme.tvmaze, 7);
	window.randomize(filme.tvdb, 6);
	window.randomize(filme.tmdb, 5);
	window.randomize(filme.meta, 4);
	window.randomize(filme.rottenusers, 3);
	window.randomize(filme.rotten, 2);
	window.randomize(filme.imdb, 1);
	window.randomize(filme.average, 0);
	
	//update sugestoes
	console.log("FIM assignmovieinfo")
	
	//relatedmovies();
	
	//schedule
	console.log(filme.airdayofweek + filme.airtime + filme.timezone)
	if(!filme.airdayofweek)
		$('#scheduletitulo, #schedule').hide();
	else
	{
		$('#scheduletitulo, #schedule').show();
		$('#schedule').text(filme.airdayofweek + ", " + filme.airtime + ", " +filme.timezone);
	}
	//getnextepisode
	if(filme.tvmazenextepisode)
	{
		console.log("assignmovie:"+filme.nextairdate)
		ajaxtvmazefuncaonextepisode();
	}
	else
	{
		$('#nextairdatetitulo, #nextairdate').hide();
		console.log("nao tem next episode")
	}
	//getpreviousepisode
	if(filme.tvmazepreviousepisode)
	{
		ajaxtvmazefuncaopreviousepisode();
	}
	else
	{
		$('#lastairdatetitulo, #lastairdate').hide();
	}
};

/* UNCAPITALIZEFIRSTLETTER */
function uncapitalizeFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

/* WINDOW.RANDOMIZE */
window.randomize = function (rating, i) 
{
	$('#radial-progress' + i).attr('data-progress', rating);
}

/* FUNCAODIMINUIRRESUMO */
function funcaodiminuirresumo()
{
	console.log("funcaodiminuirresumo")
	var maxlength=700;
	var index=0;
	if(filme.resumo.length>maxlength)
	{
		index=filme.resumo.indexOf('.', maxlength);
		if(index>filme.resumo.indexOf(',', maxlength) && filme.resumo.indexOf(',', maxlength)>0)
			index=filme.resumo.indexOf(',', maxlength);
		if(index<filme.resumo.length-5 && index>maxlength/2)
		{
			filme.resumo=[filme.resumo.slice(0, index+1), ' <span id="reticenciasresumo"> (...) </span> <span id="maisresumo">', filme.resumo.slice(index+1)].join('')+"</span>";
			$('#resumo').css('cursor', 'pointer');
			naofaznada.resumo=true;
		}
	}
	console.log("FIM funcaodiminuirresumo")
}

/***** GERAROPCOESINICIAIS *****/
geraropcoesiniciais = function () 
{
	console.log("geraropcoesiniciais")
	movieouseriegerar=movieouserie;
	if(movieouserie=="person")
	{
		movieouseriegerar=movieouserieantigo;
	}
	//VAIBUSCAR
	if((jafezmovie[language]==0 && movieouseriegerar=="movie") || (jafezserie[language]==0 && movieouseriegerar=="tv"))
	{
		$.when(
			ajaxseccao(popular, po_pular[movieouseriegerar], "p"),
			ajaxseccao(toprated, top_rated[movieouseriegerar], "tr"),
			ajaxseccao(nowplaying, now_playing[movieouseriegerar], "np"),
			ajaxseccao(upcoming, up_coming[movieouseriegerar], "u")).then(function(){
				//ACTIVASLIDES	
				if(jaactivoufilmes==0)
				{
					jaactivoufilmesfuncao();
				}
			})	
		if(movieouseriegerar=="movie")
		{
			jafezmovie[language]=1;
		}
		if(movieouseriegerar=="tv")
		{
			jafezserie[language]=1;
		}
	}
	else
	{
		//ESCREVE OPCOES INICIAIS
		console.log("loopescreveopcoesiniciais")
		for (i = 0; i < numsugestoes; i++) 
		{
			escreveropcoesiniciais(i, popular, "p")
			escreveropcoesiniciais(i, toprated, "tr")
			escreveropcoesiniciais(i, nowplaying, "np")
			escreveropcoesiniciais(i, upcoming, "u")
		}
	}	
	console.log("FIM geraropcoesiniciais")
}

/**** AJAXSECCAO ****/
function ajaxseccao(seccao, seccaourl, abreviatura)
{
		//seccao
		return $.ajax({
			url : "http://api.themoviedb.org/3/" + movieouseriegerar + seccaourl + "?&api_key=" + apikey + "&language=" + language,
			dataType : 'json',
			//async : false,
			success : function (data) 
			{
				randomnumber=9;
				for (i = 0; i < numsugestoes; i++) 
				{
					//movie
					seccao[i][title[movieouseriegerar][language]] = data.results[i][titleaqui[movieouseriegerar]];
					if(data.results[i][release_date[movieouseriegerar]])
						seccao[i][year[movieouseriegerar][language]] = data.results[i][release_date[movieouseriegerar]].substring(0, 4);
					else
						seccao[i][year[movieouseriegerar][language]] = "";
					//id
					seccao[i][identificacao[movieouseriegerar][language]] = data.results[i].id;
					//para ecra inicial
					//generos
					seccao[i][genresname[movieouseriegerar][language]]=generosfuncao(data, i, "results");
					//poster
					seccao[i][posterpath[movieouseriegerar][language]] = data.results[i][poster_path];
					escreveropcoesiniciais(i, seccao, abreviatura)
				}
				console.log("fim ajax seccao")
			}
		})
}

/*** ESCREVEROPCOESINICIAIS ***/
function escreveropcoesiniciais(i, seccao, abreviatura)
{
		
		/////seccao
		//ecrainicial
		if(seccao[i][posterpath[movieouseriegerar][language]])
			$("#smean"+abreviatura+(i + 1).toString()+'2').attr("src", base_url + tamanhoposterfilmes + seccao[i][posterpath[movieouseriegerar][language]])
		else
			$("#smean"+abreviatura+(i + 1).toString()+'2').attr("src", "../img/noposter.png")
		$("#smean"+abreviatura + (i + 1)+"lateral".toString()).text(seccao[i][title[movieouseriegerar][language]]);
		$("#detailsfilme"+abreviatura+(i + 1).toString()).html(seccao[i][title[movieouseriegerar][language]]+" (" + seccao[i][year[movieouseriegerar][language]] + ")"+"<p>" +  seccao[i][genresname[movieouseriegerar][language]] +"</p>")
		$("#detailsfilme"+abreviatura+(i + 1).toString()+" p").text(seccao[i][genresname[movieouseriegerar][language]])
		//ecralateral
		$('#s'+abreviatura + (i + 1).toString()+"lateral").text(seccao[i][title[movieouseriegerar][language]] + " (" + seccao[i][year[movieouseriegerar][language]] + ")");
		$('#descript'+abreviatura + (i + 1).toString()+"lateral").text(seccao[i][genresname[movieouseriegerar][language]]);
		$('#s'+abreviatura + (i + 1)+'2'.toString()+"lateral").css("background", "transparent url(" + base_url + "w92" + seccao[i][posterpath[movieouseriegerar][language]] + ") 10px 0px no-repeat");
		$('#s'+abreviatura + (i + 1)+'2'.toString()+"lateral").css("background-size", "auto 60px");
}

/**** JAACTIVOUFILMESFUNCAO ****/
function jaactivoufilmesfuncao()
{
		console.log("jaactivoufilmesfuncao")
		//ativar slides
		slidesfilmesstarter()

		//filme over to show title p
		for(g=1; g<=numsugestoes; g=g+1) 
		{
			(function (g) 
			{
				fadeto=0.8;
				detailsfilmeclickhover(popular, "p", g);
				detailsfilmeclickhover(toprated, "tr", g);
				detailsfilmeclickhover(nowplaying, "np", g);
				detailsfilmeclickhover(upcoming, "u", g);			
				
			}(g))
		}
		console.log("FIM jaactivoufilmesfuncao")
}

/*** SLIDESFILMESSTARTER ***/
slidesfilmesstarter = function () 
{
	console.log("slidesfilmes")
var options = {
	$AutoPlay: true,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
	$AutoPlaySteps: 4,                                  //[Optional] Steps to go for each navigation request (this options applys only when slideshow disabled), the default value is 1
	$AutoPlayInterval: 4000,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
	$PauseOnHover: 1,                               //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

	$ArrowKeyNavigation: true,   			            //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
	$SlideDuration: 160,                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
	$MinDragOffsetToSlide: 20,                          //[Optional] Minimum drag offset to trigger slide , default value is 20
	$SlideWidth: 154,                                   //[Optional] Width of every slide in pixels, default value is width of 'slides' container
	$SlideHeight: 231,                                //[Optional] Height of every slide in pixels, default value is height of 'slides' container
	$SlideSpacing: 10, 					                //[Optional] Space between each slide in pixels, default value is 0
	$DisplayPieces: 4,                                  //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
	$ParkingPosition: 0,                              //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
	$UISearchMode: 1,                                   //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).
	$PlayOrientation: 1,                                //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
	$DragOrientation: 1,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)

	$BulletNavigatorOptions: {                                //[Optional] Options to specify and enable navigator or not
		$Class: $JssorBulletNavigator$,                       //[Required] Class to create navigator instance
		$ChanceToShow:1,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
		$AutoCenter: 0,                                 //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
		$Steps: 1,                                      //[Optional] Steps to go for each navigation request, default value is 1
		$Lanes: 1,                                      //[Optional] Specify lanes to arrange items, default value is 1
		$SpacingX: 0,                                   //[Optional] Horizontal space between each item in pixel, default value is 0
		$SpacingY: 0,                                   //[Optional] Vertical space between each item in pixel, default value is 0
		$Orientation: 1                                 //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
	},

	$ArrowNavigatorOptions: {
		$Class: $JssorArrowNavigator$,              //[Requried] Class to create arrow navigator instance
		$ChanceToShow: 1,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
		$AutoCenter: 0,                                 //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
		$Steps: 1                                       //[Optional] Steps to go for each navigation request, default value is 1
	}
};

jssor_slider1 = new $JssorSlider$("slider1_container", options);
jssor_slider2 = new $JssorSlider$("slider2_container", options);
jssor_slider3 = new $JssorSlider$("slider3_container", options);
jssor_slider4 = new $JssorSlider$("slider4_container", options);
jaactivoufilmes=1;
if(ecra==0 && jaactivounoticias==1)
{
	resizeecra();
	showhide(0);
}
console.log("FIM slidesfilmes")
}

/*** DETAILSFILMECLICKHOVER ***/
function detailsfilmeclickhover(seccao, abreviatura, g)
{
	$("#detailsfilme"+ abreviatura + g + " , #s"+ abreviatura + g+"2lateral").click
	(
		function (e) 
		{
			e.stopPropagation();
			e.preventDefault();
			e.stopImmediatePropagation();
			$("#loadingscreen").show();
			movieouserie=movieouseriegerar;
			$("#mos"+movieouserie).prop('checked', true);
			filme.tmdbid = seccao[g-1][identificacao[movieouseriegerar][language]];
			infodofilmefuncao();
			return false;
		}
	)
	$('#filmecontentor'+abreviatura+g).hover
	(
		function () 
		{
			$('#detailsfilme'+abreviatura+g).fadeTo(1,fadeto)		
		},
		function()
		{
			$('#detailsfilme'+abreviatura+g).fadeTo(1,0)
		}
	)
}

/***** ACTUALIZAAFEED *****/
actualizaafeed = function()
{
	console.log("actualizaafeed")
	if((noticiasen==0 && language=="en") || (noticiaspt==0 && language=="pt"))
	{
		$.ajax({
			url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent("http://"+urlfeednoticias[language]+".ign.com/entertainment.xml"),
			dataType : 'json',
			//async : false,
			success  : function (data) 
			{
				console.log("successajaxnoticias")
				g=1;
				if (data.responseData.feed && data.responseData.feed.entries) 
				{
					$.each(data.responseData.feed.entries, function (i, e) 
					{
						conteudo="";
						conteudo=e.content;
						urlnoticia[g-1][language]=e.link;
						titulonoticia[g-1][language]=e.title;
						//
						url1=conteudo.indexOf('<img src="');
						url2=conteudo.indexOf('" width="');
						urlimagem[g-1][language]=conteudo.substring(url1+10, url2);	
						urlimagem[g-1][language]=urlimagem[g-1][language].substring(0, urlimagem[g-1][language].length-10)+urlimagem[g-1][language].substring(urlimagem[g-1][language].length-10, urlimagem[g-1][language].length).replace("200", tamanhoimagemnoticias)
						
						body1=conteudo.indexOf('align="left">');
						body2=conteudo.length;
						bodynoticia[g-1][language]=conteudo.substring(body1+13, body2);
						$("#img"+g).attr("src", urlimagem[g-1][language])
						$('#sliderb_container > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(' + (g+1).toString() + ') > div:nth-child(1) > a:nth-child(1)').text(titulonoticia[g-1][language])
						$('#sliderb_container > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(' + (g+1).toString() + ') > div:nth-child(1) > a:nth-child(1)').attr("href",urlnoticia[g-1][language])
						
						$('#titulonoticia'+g).text(titulonoticia[g-1][language])
						$('#titulonoticia'+g).attr("href",urlnoticia[g-1][language])
						
						$('#body'+g).text(bodynoticia[g-1][language])
						/*para o hollywood reporter
						if(language=="en")
						{
							url1=conteudo.indexOf("htt");
							url2=conteudo.indexOf("><br>")-1;
							urlimagem[g][language]=conteudo.substring(url1, url2);			
							body1=url2+6;
							body2a=conteudo.indexOf("<div>");
							body2b=conteudo.indexOf("<p><a");
							if(body2a<=body2b || body2b<0)
							{
								body2=body2a;
							}
							else
							{
								body2=body2b;
							}
							bodynoticia[g][language]=conteudo.substring(body1, body2);
							noticiasen=1;
						}*/
						if(language=="en")
						{
							noticiasen=1;
						}
						else
						{
							noticiaspt=1;
						}
						if(g>=(nnoticias))
						{
							return false;
						}
						g=g+1;
					});
				}			
				console.log("FIM successajaxnoticias")
			},
			complete: function(){
				if(jaactivounoticias==0)
				{
					console.log("actualizounoticias")	
					//ativar slides
					jssor_sliderb_starter('sliderb_container');
					//slide over to show body
					for(g=1; g<=nnoticias; g=g+1) 
					{
						(function (g) 
						{
							$('#slide'+g).hover
							(
								function () 
								{
									$('#body'+g).fadeTo(1,0.75)
								},
								function()
								{
									$('#body'+g).fadeTo(1,0)
								}
							)
							
						}(g))
					}
					console.log("FIM actualizounoticias")		
				}
			}
		});
	}
	else
	{
		//escrever
		for(g=1; g<=nnoticias; g=g+1)
		{
			$("#img"+g).attr("src", urlimagem[g-1][language])
			$('#sliderb_container > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(' + (g+1).toString() + ') > div:nth-child(1) > a:nth-child(1)').text(titulonoticia[g-1][language])
			$('#sliderb_container > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(' + (g+1).toString() + ') > div:nth-child(1) > a:nth-child(1)').attr("href",urlnoticia[g-1][language])
			$('#body'+g).text(bodynoticia[g-1][language])
		}
	}	
	console.log("FIM actualizaafeed")
}


/**** JSSOR_SLIDERB_STARTER ****/
jssor_sliderb_starter = function (containerId) 
{
	console.log("jssor_sliderb_starter")
	//Reference http://www.jssor.com/development/slider-with-slideshow-no-jquery.html
	//Reference http://www.jssor.com/development/tool-slideshow-transition-viewer.html

	var _SlideshowTransitions = 
	[
		//Fade in R
		{$Duration: 1200, x: -0.3, $During: { $Left: [0.3, 0.7] }, $Easing: { $Left: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 }
		//Fade out L
		, { $Duration: 1200, x: 0.3, $SlideOut: true, $Easing: { $Left: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 }
	];

	var options = 
	{
		$AutoPlay: true,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
		$AutoPlaySteps: 1,                                  //[Optional] Steps to go for each navigation request (this options applys only when slideshow disabled), the default value is 1
		$AutoPlayInterval: 4000,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
		$PauseOnHover: 1,                               //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

		$ArrowKeyNavigation: true,   			            //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
		$SlideDuration: 500,                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
		$MinDragOffsetToSlide: 20,                          //[Optional] Minimum drag offset to trigger slide , default value is 20
		//$SlideWidth: 600,                                 //[Optional] Width of every slide in pixels, default value is width of 'slides' container
		//$SlideHeight: 300,                                //[Optional] Height of every slide in pixels, default value is height of 'slides' container
		$SlideSpacing: 0, 					                //[Optional] Space between each slide in pixels, default value is 0
		$DisplayPieces: 1,                                  //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
		$ParkingPosition: 0,                                //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
		$UISearchMode: 1,                                   //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).
		$PlayOrientation: 1,                                //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
		$DragOrientation: 3,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)

		$SlideshowOptions: 
		{ 													//[Optional] Options to specify and enable slideshow or not
			$Class: $JssorSlideshowRunner$,                 //[Required] Class to create instance of slideshow
			$Transitions: _SlideshowTransitions,            //[Required] An array of slideshow transitions to play slideshow
			$TransitionsOrder: 1,                           //[Optional] The way to choose transition to play slide, 1 Sequence, 0 Random
			$ShowLink: true                                    //[Optional] Whether to bring slide link on top of the slider when slideshow is running, default value is false
		},

		$BulletNavigatorOptions: 
		{    												//[Optional] Options to specify and enable navigator or not
			$Class: $JssorBulletNavigator$,                       //[Required] Class to create navigator instance
			$ChanceToShow: 1,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
			$Lanes: 1,                                      //[Optional] Specify lanes to arrange items, default value is 1
			$SpacingX: 10,                                   //[Optional] Horizontal space between each item in pixel, default value is 0
			$SpacingY: 10                                    //[Optional] Vertical space between each item in pixel, default value is 0
		},

		$ArrowNavigatorOptions:
		{
			$Class: $JssorArrowNavigator$,              //[Requried] Class to create arrow navigator instance
			$ChanceToShow: 1,                                //[Required] 0 Never, 1 Mouse Over, 2 Always
			$AutoCenter: 0                                 //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
		},

		$ThumbnailNavigatorOptions:
		{
			$Class: $JssorThumbnailNavigator$,              //[Required] Class to create thumbnail navigator instance
			$ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
			$ActionMode: 0,                                 //[Optional] 0 None, 1 act by click, 2 act by mouse hover, 3 both, default value is 1
			$DisableDrag: true                              //[Optional] Disable drag or not, default value is false
		}
	};

	jssor_sliderb = new $JssorSlider$(containerId, options);
	jaactivounoticias=1;
	if(ecra==0 && jaactivoufilmes==1)
	{
		resizeecra();
		showhide(0);
	}
	console.log("FIM jssor_sliderb_starter")
};


/***** ECRAINICIALLATERALFUNCAO *****/
function ecrainiciallateralfuncao()
{
	console.log("ecrainiciallateralfuncao")
	var options = 
		{
                $AutoPlay: true,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
                $AutoPlaySteps: 1,                                  //[Optional] Steps to go for each navigation request (this options applys only when slideshow disabled), the default value is 1
                $AutoPlayInterval: 4000,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
                $PauseOnHover: 1,                               //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

                $ArrowKeyNavigation: true,   			            //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
                $SlideDuration: 500,                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
                $MinDragOffsetToSlide: 20,                          //[Optional] Minimum drag offset to trigger slide , default value is 20
                //$SlideWidth: 600,                                 //[Optional] Width of every slide in pixels, default value is width of 'slides' container
                //$SlideHeight: 300,                                //[Optional] Height of every slide in pixels, default value is height of 'slides' container
                $SlideSpacing: 5, 					                //[Optional] Space between each slide in pixels, default value is 0
                $DisplayPieces: 1,                                  //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
                $ParkingPosition: 0,                                //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
                $UISearchMode: 1,                                   //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).
                $PlayOrientation: 1,                                //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
                $DragOrientation: 1,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)
				//$SlideHeight: 300,

                $ThumbnailNavigatorOptions: {
                    $Class: $JssorThumbnailNavigator$,              //[Required] Class to create thumbnail navigator instance
                    $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always

                    $ActionMode: 1,                                 //[Optional] 0 None, 1 act by click, 2 act by mouse hover, 3 both, default value is 1
                    $AutoCenter: 0,                             //[Optional] Auto center thumbnail items in the thumbnail navigator container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 3
                    $Lanes: 1,                                      //[Optional] Specify lanes to arrange thumbnails, default value is 1
                    $SpacingX: 0,                                   //[Optional] Horizontal space between each thumbnail in pixel, default value is 0
                    $SpacingY: 0,                                   //[Optional] Vertical space between each thumbnail in pixel, default value is 0
                    $DisplayPieces: 4,                              //[Optional] Number of pieces to display, default value is 1
                    $ParkingPosition: 0,                            //[Optional] The offset position to park thumbnail
                    $Orientation: 1,                                //[Optional] Orientation to arrange thumbnails, 1 horizental, 2 vertical, default value is 1
                    $DisableDrag: true                              //[Optional] Disable drag or not, default value is false
                }
            };

            jssor_sliderc = new $JssorSlider$("sliderc_container", options);
			$('.filmesdivlateral').perfectScrollbar();	
			actualizarcampos();	
			if(ecra==1)
			{
				resizeecra();
			}
			console.log("fim de ecrainiciallateralfuncao")
}


/***** SECLICA *****/
seclica = function()
{
	/**** SE CLICA LOGO ****/
	$('#heading').click
	(
		function (e) 
		{
			e.stopPropagation();
			e.preventDefault();
			e.stopImmediatePropagation();
			$('#movie').val("");
			history.pushState({homepage: true, language: language, movieouserie: movieouserie}, null, "#"+language+"/"+movieouserie);
			cleaneverything();
			showhide(0);
		}
	)
	
	//sugestoes
	sugestoesfuncao();
	//SUGESTOES
	
	/**** SE CLICA RODAPE ****/
	$(".rodapetitleitem").click
	(
		function (e) 
		{
			e.stopPropagation();
			e.preventDefault();
			e.stopImmediatePropagation();
			scrolltohere=this.id.replace("title", "body"); 
			$("#rodapebody").toggle();
			$('#afterfeedback').hide();			
			document.getElementById(scrolltohere).scrollIntoView(true,{block: "end", behavior: "smooth"});
		}
	);
	//RODAPE
	
	//cast
	clicacast();		
	//seasons
	clicaseasons();
	//collection
	clicacollection();
	//trailer
	clicatrailer();
	//informacoes
	informacoeshover();
	//BOTAO IM FEELING LUCKY
	imfeelinglucky()
	//fbcomments
	clicafacebookcomentarios()	
	//feedback
	clicafeedbackfuncao();
	//advancedsearch
	clicaadvancedsearch();
	//clicamusic
	retrievesongs();
	
	
	$('#resumo').click
	(
		function (e) 
		{
			e.stopPropagation();
			e.preventDefault();
			e.stopImmediatePropagation();
			if(!naofaznada.resumo) return false
			$('#maisresumo').toggle();
			$('#reticenciasresumo').toggle();
			resizeecra();
		}
	)
}

/**** SUGESTOESFUNCAO ****/
sugestoesfuncao = function () 
{
	//cria suggestions
	$("#movie").keyup( 
		function (e) 
		{
			//console.log(e.which+" "+downarrow+" "+$.trim($('#movie').val()).length)
			if(e.which==13 && downarrow==-1)
			{
				if(sugestao[0].numsugestoes<20)
				{
					vemdoenter=true;
					interiorinteriorsugestoes();
				}
				return false;
			}
			else if(e.which==32 || e.which==39 || e.which==37)
			{
				return false;
			}
			else if($.trim($('#movie').val()).length <= 0)
			{
				$('#movie').focus();
				return false;
			}
			else if(e.which==27)
			{
				$("#movie").blur();
				return false;
			}
			else if(e.which==13 && downarrow!=-1)
			{
				$('#movie').blur();
				filme.tmdbid = sugestao[downarrow].identificacao;
				infodofilmefuncao();
				return false;
			}
			else if (e.keyCode == 40 && (sugestao[0].numsugestoes-sugestao[0].numsughide)>0)
			{
				$('#sugestoes').show();
				downarrow=downarrow+1;
				console.log(downarrow)
				console.log(sugestao[0].numsugestoes)
				console.log(sugestao[0].numsughide)
				if(sugestao[0].numsughide>0)
				{
					console.log("entrouondequeria1")
					$('#posters'+(downarrow-1).toString()).removeClass("hover");
					if(downarrow>=(sugestao[0].numsugestoes-sugestao[0].numsughide))
					{
						console.log("entrouondequeria2")
						downarrow=0;
						console.log(downarrow)
					}
				}
				else
				{
					if(downarrow>=sugestao[0].numsugestoes && sugestao[0].numsugestoes<20)
					{
						$('#posters'+(downarrow-1).toString()).removeClass("hover");
						vemdoenter=true;
						interiorinteriorsugestoes();
					}
					else if(downarrow>=sugestao[0].numsugestoes && sugestao[0].numsugestoes>=20)
					{
						$('#posters'+(downarrow-1).toString()).removeClass("hover");
						downarrow=0;
					}
					else
					{
						$('#posters'+(downarrow-1).toString()).removeClass("hover");
					}
				}
				$('#posters'+downarrow).addClass("hover");
				return false;
			}
			else if (e.keyCode == 38  && (sugestao[0].numsugestoes-sugestao[0].numsughide)>0)
			{
				$('#sugestoes').show();
				downarrow=downarrow-1;
				console.log(downarrow)
				console.log(sugestao[0].numsugestoes)
				console.log(sugestao[0].numsughide)
				if(sugestao[0].numsughide>0)
				{
					console.log("entrouondequeria1")
					$('#posters'+(downarrow+1).toString()).removeClass("hover");
					if(downarrow<=-1)
					{
						console.log("entrouondequeria2")
						downarrow=(sugestao[0].numsugestoes-sugestao[0].numsughide)-1;
						console.log(downarrow)
					}
				}
				else
				{
					$('#posters'+(downarrow+1).toString()).removeClass("hover");
					if(downarrow<=-1)
					{
						downarrow=sugestao[0].numsugestoes-1;
					}
				}
				$('#posters'+downarrow).addClass("hover");
				return false;
			}
			clearInterval(globalTimeout);
			globalTimeout = setTimeout(
			function()
			{
				console.log("sugestoes")
				downarrow=-1;
				$('#sugestoes').show();
				funcaointeriorsugestoes();
				console.log("FIM sugestoes")
			}, 200);
		}
	)
	//define quando sugestoes aparecem ou nao
	$('#movie').focus
	(
		function ()
		{
			if ($.trim($('#movie').val()).length <= 0) 
			{
				$('#sugestoes').hide();
				return false;
			}
			funcaointeriorsugestoes();
			$('#sugestoes').show();
		}
	)
	$('#movie').blur
	(
		function () 
		{
			sugestao[0].numsugestoes=5;
			setTimeout(function () {
				//clica sugestao
					$('#sugestoes').hide()
					$("#sugestoes").empty();
					$('#posters'+(downarrow).toString()).removeClass("hover");
					downarrow=-1;
			}, 400);//esconde as duas search
		}
	)
	//SECLICAENTER
	enterfuncao();
}

/*** FUNCAOINTERIORSUGESTOES ***/
function funcaointeriorsugestoes()
{
			var palavraapesquisar=$("#movie").val();
			palavraapesquisar=palavraapesquisar.split(' ').join('+');
			
			console.log("funcaointeriorsugestoes: "+palavraapesquisar)
			
			$.ajax
			({
				type : "GET",
				url : "http://api.themoviedb.org/3/search/"+ movieouserie + "?query=" + palavraapesquisar + "&language=" + language + "&api_key=" + apikey,
				dataType : 'json',
				//async: false,
				success : function (data) 
				{
					datasugestoes=data;
					vemdoenter=false;
					$("#sugestoes").empty();
					sugestao[0].numsughide=0;
					sugestao[0].starting=0;
					sugestao[0].numsugestoes=5;
					interiorinteriorsugestoes();
				}
			})
			console.log("FIM funcaointeriorsugestoes")
}

function interiorinteriorsugestoes()
{
	if(vemdoenter)
	{
		sugestao[0].starting=sugestao[0].numsugestoes;
		sugestao[0].numsugestoes=sugestao[0].numsugestoes+5;
	}
	if(sugestao[0].numsugestoes>20)
	{
		vemdoenter=false;
		return false;
	}
	for (i = sugestao[0].starting; i < sugestao[0].numsugestoes; i++) 
	{
		if(!sugestao[i])
			sugestao.push(new Object());
		if (!datasugestoes.results[i] || !datasugestoes.results[i][titleaqui[movieouserie]] || !datasugestoes.results[i].id)
		{
			if(sugestao[0].numsughide>=(sugestao[0].numsugestoes-1))
			{
				$("#sugestoes").empty();
				sugestao[i].posterpath='../img/sadface.png';
				sugestao[i].title="No results available";
				sugestao[i].genresname="Try reducing the search terms and check if you're searching for the right media (movies, series or people)";
				$("#sugestoes").append('<div class="posters" id="posters'+i+'"><div id="s'+i+'2" style="background: transparent url('+ sugestao[i].posterpath +') 5px 0px no-repeat; background-size: auto 60px" class="supratexto"><div class="texto"><b id="s'+i+'">'+ sugestao[i].title +'</b><br><div id="descript'+i+'">'+ sugestao[i].genresname +'</div></div></div></div>');
			}
			sugestao[0].numsughide++;
			continue;
		}
		sugestao[i].genresname="";					
		sugestao[i].title = datasugestoes.results[i][titleaqui[movieouserie]];
		sugestao[i].identificacao = datasugestoes.results[i].id;
		
		if(movieouserie=="person")
		{
			for(m=0; m<datasugestoes.results[i].known_for.length; m++)
			{
				if(datasugestoes.results[i].known_for[m].title)
					sugestao[i].genresname=sugestao[i].genresname+ ", " + datasugestoes.results[i].known_for[m].title
				if(m>=3)
					break;
			}
			sugestao[i].genresname=sugestao[i].genresname.substring(1)
			sugestao[i].posterpath = base_url + tamanhopostersugestoes +datasugestoes.results[i].profile_path;
		}
		else
		{
			if(datasugestoes.results[i][release_date[movieouserie]])
				sugestao[i].year = datasugestoes.results[i][release_date[movieouserie]].substring(0, 4);
			else
				sugestao[i].year="";
			//generos
			sugestao[i].genresname=generosfuncao(datasugestoes, i, "results");//define o sugestao[i].genresname
			//poster
			sugestao[i].posterpath = base_url + tamanhopostersugestoes +datasugestoes.results[i][poster_path];
			sugestao[i].title= sugestao[i].title + " (" + sugestao[i].year + ")";
		}
		if(!sugestao[i].posterpath || sugestao[i].posterpath.substr(sugestao[i].posterpath.length - 4)=='null')
			sugestao[i].posterpath="../img/noposter.png";
								
		$("#sugestoes").append('<div class="posters" id="posters'+i+'"><div id="s'+i+'2" style="background: transparent url('+ sugestao[i].posterpath +') 10px 0px no-repeat; background-size: 42.5px 60px" class="supratexto"><div class="texto"><b id="s'+i+'">'+ sugestao[i].title +'</b><br><div id="descript'+i+'">'+ sugestao[i].genresname +'</div></div></div></div>');

		$('#s' + i + '2').unbind("click");
		(function (i) 
		{
			$('#s' + i + '2').click
			(
				function (e) 
				{
					e.stopPropagation();
					e.preventDefault();
					e.stopImmediatePropagation();
					$("#loadingscreen").show();
					console.log("CLICK:"+sugestao[i].identificacao)
					$("#movie").blur();//esconde as duas search
					filme.tmdbid = sugestao[i].identificacao;
					infodofilmefuncao();
				}
			)
		}(i))	
	}
	vemdoenter=false;
}

/*** ENTERFUNCAO ***/
enterfuncao = function ()
{
	$("#formulario").submit
	(
		function () 
		{
				return false;
		}
	);
}

/**** CLICACAST ****/
clicacast = function()
{
	$("#casttitle").click
	(
		function (e) 
		{
			console.log("clicacast")
			e.stopPropagation();
			e.preventDefault();
			e.stopImmediatePropagation();
			$("#loadingscreen").show();
			if(!castjafez)
			{
				console.log("hello");
				$.ajax({
					url: '/php/netprod_checkrow_retrieve.php',  //Server script to process data
					type: 'POST',
					dataType: 'json',
					data: {
						MId: movierow.MId
					},
					success: function(data)
					{
						funcaoproductioncompanies(data);
					}
				})
				/*
				if(movieouserie=="tv")
				{
					funcaocreated_by(datatmdbmain);
				}
				*/
				
				//obter credits
				$.ajax({
					url: '/php/person_checkrow_retrieve.php',  //Server script to process data
					type: 'POST',
					dataType: 'json',
					data: {
						media_type: movierow.MTy,
						MId: movierow.MId,
						LaId: language,
						MTmdbId: movierow.MTmdbId
					},
					success : function (data) {
						console.log("AJAX credits")
						funcaocredits(data);
						console.log(idcastandcrew);
						
						
						//created_by
						if(!filme.created_by || filme.created_by=="N/A" || movieouserie=="movie")
						{
							$('#created_bydiv').hide()
						}
						else
						{
							//SECLICAcreated_by
							$('#created_by').html(filme.created_by);
							$('#created_bydiv').show();
							$('#created_by1').text(created_by[language]);
							for(m=1; m<=filme.created_bylength; m++)
							{
								(function (m) 
								{
									$('#created_byindividual'+ m).click
									(
										function (e) 
										{
											e.stopPropagation();
											e.preventDefault();
											e.stopImmediatePropagation();
											$("#loadingscreen").show();
											ajaxpessoa(created_by_id[m]);
										}
									)
								}(m))
							}
						}
						
						arraycastandcrew=["actors","director","writer","othercast"];
						for(t=0; t<arraycastandcrew.length; t++)
						{
							writecastandcrew(arraycastandcrew[t]);
						}
						
						//productioncompanies
						//foi para dentro do funcaoproductioncompanies devido ao ajax
						
						castjafez=true;
					},
					complete: function(){
						abasshowhide("cast");
						resizeecra();
						console.log("ajaxcredits FIM")
					},
					error: function ()
					{
						console.log("ajaxcredits error")
					}
				})
			}
			else
			{
				abasshowhide("cast");
				resizeecra();
			}
			console.log("FIMclicacast")
			return false;
		}
	)			
}

function writecastandcrew(indexcc)
{
	if(!filme[indexcc] || filme[indexcc]=="N/A")
	{
		$('#'+indexcc+'div').hide();
	}
	else
	{
		//SECLICAACTORS
		$('#'+indexcc).html(filme[indexcc]);
		$('#'+indexcc+'div').show();
		if (filme[indexcc+'length']>1)
		{
			$('#'+indexcc+'1').text(castandcrew[indexcc][1][language]);
		}
		else
		{
			$('#'+indexcc+'1').text(castandcrew[indexcc][0][language]);
		}
		for(m=1; m<=filme[indexcc+'length']; m++)
		{
			(function (m) 
			{
				$('#'+indexcc+'individual'+ m).click
				(
					function (e) 
					{
						e.stopPropagation();
						e.preventDefault();
						e.stopImmediatePropagation();
						console.log(indexcc+"individual")
						$("#loadingscreen").show();
						filme.tmdbid=idcastandcrew[indexcc][m];
						movieouserie="person";
						$("#mosperson").prop('checked', true);
						infodofilmefuncao();
						return false;
					}
				)
			}(m))
		}
	}
}

/*** FUNCAODATAVARIOS ***/
function funcaodatavarios(data, datatipo, numeroqueaparece)
{
	console.log("funcaodatavarios:"+datatipo)
	filme[datatipo]="";
	$('#'+datatipo+'1').css('cursor', 'default' );
	h=0;
	for (m = 0; m < data[datatipo].length; m++) 
	{
		if(!data[datatipo][m].name)
		{
			continue;
		}
		filme[datatipo] = filme[datatipo]+'<div class="actorsindividual hvr-box-shadow-outset hvr-sweep-to-bottom">'+data[datatipo][m].name+"</div>";
		h=h+1;
	}
	naofaznada[datatipo]=false;
	filme[datatipo+"length"]=h;
	console.log("FIM funcaodatavarios")
}

/*** FUNCAOPRODUCTIONCOMPANIES ***/
function funcaoproductioncompanies(data)
{
	console.log("FUNCAOPRODUCTIONCOMPANIES:")
	filme.production_companies = "";
	h=0;
	console.log(data.length);
	filme.production_companieslength=data.length;
	if(filme.production_companieslength==0)
		$('#production_companiesdiv').hide();
	for (h = 0; h < filme.production_companieslength; h++) 
	{
			if(!data[h].NpLp)
			{
				foto="../img/nologo.png"
				hsize="49px";
			}
			else
			{
				foto=data[h].NpLp.replace("wsize", tamanhoactors);
				hsize="auto";
			}
			if(!data[h].NpH)
				data[h].NpH='href="javaScript:void(0);" target="_self" style="cursor:default"';
			else
				data[h].NpH='href="'+ data[h].NpH +'" target="_blank" style="cursor:pointer"';
			
			if(data[h].NpTy=="Production Company")
			{
				filme.production_companies = filme.production_companies+'<a '+data[h].NpH+'  "id="production_companiesindividual'+ h +'" class="actorsindividual hvr-box-shadow-outset hvr-sweep-to-bottom"><img src="'+ foto +'" style="width: 92px; height:'+ hsize +'"/><div class="personagemdiv"><b>'+data[h].NpN + "</b><br>" + data[h].NpHq+ "</div></a>";
			}
			else
			{
				filme.networks = filme.networks+'<a '+data[h].NpH+'  "id="netowrksindividual'+ h +'" class="actorsindividual hvr-box-shadow-outset hvr-sweep-to-bottom"><img src="'+ foto +'" style="width: 92px; height:'+ hsize +'"/><div class="personagemdiv"><b>'+data[h].NpN + "</b><br>" + data[h].NpHq+ "</div></a>";
			}
	}
	
	//production_companies
	if(!filme.production_companies  || filme.production_companies=="N/A")
	{
		$('#production_companiesdiv').hide();
	}
	else
	{
		$('#production_companiesdiv').show();
		$('#production_companies1').text(production_companies[language]);
		$('#production_companies').html(filme.production_companies);
	}
	if(!filme.networks  || filme.networks=="N/A" || movieouserie=="movie")
	{
		$('#networksdiv').hide();
	}
	else
	{
		$('#networksdiv').show();
		$('#networks1').text(networks[language]);
		$('#networks').html(filme.networks);
	}
	console.log("FIM FUNCAOPRODUCTIONCOMPANIES")
}

/*** FUNCAOCREDITS ***/
function funcaocredits(data)
{
	console.log("funcaocredits")
	
	filme.actors = "";
	idcastandcrew.actors=[];
	filme.director = "";
	idcastandcrew.director=[];
	filme.writer = "";
	idcastandcrew.writer=[];
	filme.othercast="";
	idcastandcrew.othercast=[];
	acting=0;
	directing=0;
	writing=0;
	othercasting=0;
	
	//ACTORS	
	for (m = 0; m < data.cast.length; m++) 
	{
		acting=getcastfuncao("cast", "actors", acting,data);
	}
	filme.actorslength=acting;
	
	//CREW
	for (m = 0; m < data.crew.length; m++) 
	{
		//DIRECTOR
		if(data.crew[m].PDp=="Directing")
		{
			directing=getcastfuncao("crew", "director", directing,data);
		}
		
		//WRITER
		else if(data.crew[m].PDp=="Writing")
		{
			writing=getcastfuncao("crew", "writer", writing,data);
		}
		//othercast
		else
		{
			othercasting=getcastfuncao("crew", "othercast", othercasting,data);
		}
	}
	//director
	filme.directorlength=directing;
	//writer
	filme.writerlength=writing;
	//othercast
	filme.othercastlength=othercasting;
	
	console.log("FIM funcaocredits")
}

function getcastfuncao(type, PDp, variavel,data)
{
	variavel=variavel+1;
	idcastandcrew[PDp][variavel]=data[type][m].MTmdbId;
	if(!data[type][m].PJc)	character="";
	else character=" <br>(" + data[type][m].PJc + ")";
	if(!data[type][m].MPp)
	{
		foto="../img/desconhecido.png"
	}
	else
	{
		foto=data[type][m].MPp.replace("wsize", tamanhoactors)
	}
	filme[PDp] = filme[PDp]+'<div id="'+ PDp +'individual'+ variavel +'" class="actorsindividual hvr-box-shadow-outset hvr-sweep-to-bottom"><img src="'+ foto +'" style="width: 92px; height: 123px"/><div class="personagemdiv"><b>'+data[type][m].MOn + "</b>" + character + "</div></div>";
	return variavel;
}

/* SECLICAPESSOA */
function seclicapessoa(media)
{
	$("#"+media+"title").click
	(
		function (e) 
		{
			e.stopPropagation();
			e.preventDefault();
			e.stopImmediatePropagation();
			$("#loadingscreen").show();
			if(!jafez[media])
			{
				$.ajax({
					url: '/php/person_checkrow_retrieve.php',  //Server script to process data
					type: 'POST',
					dataType: 'json',
					data: {
						media_type: movierow.MTy,
						MId: movierow.MId,
						LaId: language,
						MTmdbId: movierow.MTmdbId
					},
					success : function (data) {
						mediabody="";
						mediatext="";
						mediacredit_idcast=[];
						datacastlength=0;
						if(data.cast.length>0)
						{
							h=0;
							for (m = 0; m < data.cast.length; m++) 
							{
								if(data.cast[m].PMTy!=media)
								{
									continue;
								}
								/*
								if(media=="tv" && data.cast[m].episode_count)
								{
									episodes="<br>"+data.cast[m].episode_count +" episodes";
								}
								*/
								episodes="";
								if(!data.cast[m].PJc)
								{
									data.cast[m].PJc="";
								}
								else
								{
									data.cast[m].PJc="<br>" + data.cast[m].PJc + episodes;
								}
								mediaidcast.push(new Object());
								mediaidcast[h][media]=data.cast[m].MTmdbId;
								h=h+1;
								if(!data.cast[m].MPp)
								{
									foto="../img/noposter.png"
								}
								else
								{
									foto=data.cast[m].MPp.replace("wsize", tamanhoactors);
								}
								mediabody="<b>"+data.cast[m].MN + "</b><br>" + data.cast[m].MRd + data.cast[m].PJc;
								mediatext = mediatext+'<div id="pessoa'+media+'cast'+ h +'" class="aloneindividual" ><div class="individualinner hvr-box-shadow-outset hvr-sweep-to-bottom"> <img src="'+ foto +'" style="width: 92px; height: 138px"/><div class="personagemdiv">'+ mediabody + "</div></div></div>";
							}
							datacastlength=h;
							if(mediatext)
							{
								mediacast={en:"Cast", pt:"Elenco"};
								$('#'+media+'cast').html(mediatext);
								$('#'+media+'castdiv').show();
								$('#'+media+'cast1').text(mediacast[language]);
								for(g=1; g<=datacastlength; g=g+1) 
								{
									(function (g) 
									{
										$("#pessoa"+media+'cast'+ g).click
										(
											function (e) 
											{
												e.stopPropagation();
												e.preventDefault();
												e.stopImmediatePropagation();
												$("#loadingscreen").show();
												movieouserie=media;
												$("#mos"+movieouserie).prop('checked', true);
												filme.tmdbid = mediaidcast[g-1][media];
												infodofilmefuncao();
												return false;
											}
										)				
									}(g))
								}
							}
						}
						mediabody="";
						mediatext="";
						mediacredit_idcrew=[];
						datacrewlength=0;						
						if(data.crew.length>0)
						{
							h=0;
							for (m = 0; m < data.crew.length; m++) 
							{
								if(data.crew[m].PMTy!=media)
								{
									continue;
								}
								/*
								if(media=="tv" && data.cast[m].episode_count)
								{
									episodes="<br>"+data.cast[m].episode_count +" episodes";
								}
								*/
								episodes="";
								if(!data.crew[m].PJc)
								{
									data.crew[m].PJc="";
								}
								else
								{
									data.crew[m].PJc="<br>" + data.crew[m].PJc + episodes;
								}
								mediaidcrew.push(new Object());
								mediaidcrew[h][media]=data.crew[m].MTmdbId;
								h=h+1;
								if(!data.crew[m].MPp)
								{
									foto="../img/noposter.png"
								}
								else
								{
									foto=data.crew[m].MPp.replace("wsize", tamanhoactors);
								}
								mediabody="<b>"+data.crew[m].MN + "</b><br>" + data.crew[m].MRd + data.crew[m].PJc;
								mediatext = mediatext+'<div id="pessoa'+media+'crew'+ h +'" class="aloneindividual" ><div class="individualinner hvr-box-shadow-outset hvr-sweep-to-bottom"> <img src="'+ foto +'" style="width: 92px; height: 138px"/><div class="personagemdiv">'+ mediabody + "</div></div></div>";
							}
							datacrewlength=h;
							if(mediatext)
							{
								mediacrew={en:"crew", pt:"Staff"};
								$('#'+media+'crew').html(mediatext);
								$('#'+media+'crewdiv').show();
								$('#'+media+'crew1').text(mediacrew[language]);
								for(g=1; g<=datacrewlength; g=g+1) 
								{
									(function (g) 
									{
										$("#pessoa"+media+'crew'+ g).click
										(
											function (e) 
											{
												e.stopPropagation();
												e.preventDefault();
												e.stopImmediatePropagation();
												$("#loadingscreen").show();
												movieouserie=media;
												$("#mos"+movieouserie).prop('checked', true);
												filme.tmdbid = mediaidcrew[g-1][media];
												infodofilmefuncao();
												return false;
											}
										)				
									}(g))
								}
							}
						}	

					},
					complete: function()
					{
						if(datacrewlength<=0 && datacastlength<=0)
						{
							$('#'+media+'cast1').html("There's no information available.");
							$('#'+media+'castdiv').show();
						}
						abasshowhide(media);
						resizeecra();
						jafez[media]=true;
					},
					error: function(){
					}
				})
			}
			else
			{
				abasshowhide(media);
				resizeecra();
			}
			return false;
		}

	)
}	

/* CLEANEVERYTHING */
function cleaneverything()
{
	console.log("cleaneverything")

				filme.airdayofweek="";
				filme.airtime="";
				filme.lastairdate="";
				filme.timezone="";
				filme.nextairdate="";
				filme.tvmazenextepisode="";
				filme.tvmazepreviousepisode="";
				filme.networks="";
				removeumusica=false;
				trailerjafez=false;
				behindthescenesjafez=false;
				existecolecao=false;
				colecaojafez=false;
				castjafez=false;
				seasonsjafez=false;
				jafez.tv=false;
				jafez.movie=false;
				musicjafez=false;
				trailerindex=0;
				behindthescenesindex=0;
				mudoumovie=0;
				filme.backdrop_path="";
				filme.DVD="";
				datatmdbmain=[];
				datatmdbeids=[];
				dataomdbmain=[];
				datatraktrating=[];
				datatvdbmain=[];
				datatvmazemain=[];
				datanetflixmain=[];
				datatvisomain=[];
				datatmdbvideo=[];
				datatmdbcollection=[];
				datatmdbcredits=[];
				collection = [];
				trailerarray=[];
				arraybehindthescenes=[];
				filme.tvdb="";
				filme.tvmaze="";
				filme.omdbid = "";
				filme.posterpath = "";
				filme.tmdb = "";
				filme.tmdbvotes = "";
				filme.resumo = "";
				filme.release = "";
				filme.title = "";
				filme.tempoduracao = "";
				filme.year = "";
				filme.pais="";
				filme.languages="";
				filme.urloriginal = "";
				filme.genero = "";
				filme.status="";
				filme.boxoffice = "";
				filme.budget = "";
				filme.tvdbid = "";
				filme.meta= "";
				filme.imdb= "";
				filme.rotten= "";
				filme.rottenusers= "";
				filme.metavotes="";
				filme.imdbvotes="";
				filme.rottenvotes="";
				filme.rottenusersvotes="";
				filme.rated = "";
				filme.awards = "";
				filme.tvdbvotes="";
				filme.tvmazevotes="";
				filme.tvmazeurl="";	
				filme.trakt = "";
				filme.traktvotes="";
				filme.tviso = "";
				filme.tvisovotes="";
				filme.tvisotitle="";
				filme.tvisoid="";
				filme.tvisomediaType="";
				filme.netflix = "";
				filme.netflixid="";
				filme.netflixvotes="";
				filme.tagline="";
				$('#aviso').hide();
				$('#moviecrewdiv').hide();
				$('#tvcrewdiv').hide();
				$('#moviecastdiv').hide();
				$('#tvcastdiv').hide();
				mediaidcrew=[];
				mediaidcast=[];
				$("#musicbody").empty();
}

/*** FUNCAOCREATED_BY ***/
function funcaocreated_by(data)
{
	filme.created_by = "";
	created_by_id=[];
	h=0;
	for (m = 0; m < data.created_by.length; m++) 
	{
		if(!data.created_by[m].name)
		{
			continue;
		}
		h=h+1;
		created_by_id[h]=data.created_by[m].id;
		if(!data.created_by[m].profile_path)
		{
			foto="../img/desconhecido.png"
		}
		else
		{
			foto=base_url + tamanhoactors + data.created_by[m].profile_path;
		}
		filme.created_by = filme.created_by+'<div id="created_byindividual'+ h +'" class="actorsindividual hvr-box-shadow-outset hvr-sweep-to-bottom"><img src="'+ foto +'" style="width: 92px; height: 123px"/><div class="personagemdiv"> <b>'+data.created_by[m].name + "</b></div></div>";
	}
	filme.created_bylength=h;
}

/*** ABASSHOWHIDE ***/
function abasshowhide(aba)
{
	ababody=aba+"body";
	abatitle=aba+"title";
	if($('#'+ababody).is(":visible"))//se na que clicou esa visivel
	{
		$("#abasbodydiv>div").hide();
		$("#abastitulosdiv>div").removeClass("hvr-growhover");
		$('#backdropabas').hide();
		if(!nobackdrop)
		{
			$("#abasbodydiv").show();
			$('#backdropabas').show();
		}
		else
		{
			$("#abasbodydiv").hide();
		}
	}
	else//se nao
	{
		$("#abasbodydiv").show();
		$("#abasbodydiv>div").hide();
		$("#abastitulosdiv>div").removeClass("hvr-growhover");
		$('#'+ababody).show();
		$('#'+abatitle).addClass("hvr-growhover");
	}

	$("#loadingscreen").hide();
	$('#'+ababody).scrollintoview({
		duration: 2000,
		direction: "both",
		complete: function() {
			// highlight the element so user's focus gets where it needs to be
		}
	});
}

/**** CLICASEASONS ****/
clicaseasons = function()
{
	$("#seasonstitle").click
	(
		function (e) 
		{
			e.stopPropagation();
			e.preventDefault();
			e.stopImmediatePropagation();
			$("#loadingscreen").show();
			if(!seasonsjafez)
			{
				//obtem info das seasons
				$('#seasonstitle').css( 'cursor', 'pointer' );
				h=0;
				$('#seasonsbody').empty();
				for (m = 0; m < datatmdbmain.seasons.length; m++) 
				{
					if(!datatmdbmain.seasons[m].air_date)
					{
						continue;
					}
					if(!datatmdbmain.seasons[m].season_number)
					{
						continue;
					}
					if(!datatmdbmain.seasons[m].poster_path)
					{
						foto="../img/noposter.png"
					}
					else
					{
						foto=base_url + tamanhoactors + datatmdbmain.seasons[m].poster_path;
					}
					console.log(h)
					console.log(m)
					filme["seasons"+h]=datatmdbmain.seasons[m].season_number;
					seasonsbody="<b>"+seasonslanguage[language] + datatmdbmain.seasons[m].season_number + "</b><br>" + datatmdbmain.seasons[m].episode_count + episodeslanguage[language] + "<br>" + release[movieouserie][language] + datatmdbmain.seasons[m].air_date
					$('#seasonsbody').append('<div id="seasons'+ h +'" class="aloneindividual seasonindividual"><div class="individualinner hvr-box-shadow-outset  hvr-sweep-to-bottom"> <img src="'+ foto +'" style="width: 92px; height: 138px"/><div class="personagemdiv">'+ seasonsbody + "</div></div></div>");
					(function (h) 
					{
						$("#seasons" + h).click
						(
							function (e) 
							{
								e.stopPropagation();
								e.preventDefault();
								e.stopImmediatePropagation();
								funcaoseasonsepisodes(filme["seasons"+h]);
								//$("#loadingscreen").show();
								return false;
							}
						)				
					}(h))
					h=h+1;
				}
				$('#seasonstitle').text(seasons[language]);
				filme.seasonslength=h;
				abasshowhide("seasons");	
				resizeecra();
				seasonsjafez=true;
				if(!seasonsepisodes[0])
					seasonsepisodes.push(new Object());
				seasonsepisodes[0].primeiravez=true;
			}
			else
			{
				abasshowhide("seasons");	
				resizeecra();
			}
			return false;
		}
	)			
}

function funcaoseasonsepisodes(seasonsindex)
{
	console.log("n ajax:"+seasonsindex)
	if(seasonsepisodes[0].primeiravez)
	{
		$('#seasondropdown').empty();
		for(i=0; i<filme.seasonslength; i++)
		{
			$('#seasondropdown').append('<option value="'+filme["seasons"+i]+'">Season '+ filme["seasons"+i] +'</option>');
		}		
		seasonsepisodes[0].primeiravez=false;
		$('#seasondropdown').change(
			function()
			{
				seasonsindex=$('#seasondropdown').val();
				ajaxepisodes(seasonsindex);
			}
		)
	}

	ajaxepisodes(seasonsindex);
}

function ajaxepisodes(seasonsindex)
{
	console.log("ajax:"+seasonsindex)
	$('#seasondropdown').val(seasonsindex);
	$('#seasonsepisodesbody').show();
	$('#seasonsbody').hide();
	$('#seasonsepisodes').empty();
$.ajax({
	url : "http://api.themoviedb.org/3/tv/" + filme.tmdbid + '/season/' + seasonsindex + "?&api_key=" + apikey,
	dataType : 'json',
	//async : false,
	success : function (data)
	{
		if(data.episodes)
		{
			for(i=0; i<data.episodes.length; i++)
			{
				if(!seasonsepisodes[i])
					seasonsepisodes.push(new Object());
				//data.episodes[i].production_code);
				if(!data.episodes[i].still_path)
				{
					foto="../img/noposter.png"
				}
				else
				{
					foto=base_url + "w185" + data.episodes[i].still_path;
					//"w154" "w185" "w342" "w500" "w780" "original"
				}
				seasonsbody='<div class="infoepi" ><b>Episode ' + data.episodes[i].episode_number+" - "+ data.episodes[i].name + "</b><br>" + data.episodes[i].air_date + "<br>" + data.episodes[i].overview+'</div>';
				//data.crew;//array
				//data.gueststars;//array;
				$('#seasonsepisodes').append('<div class="aloneindividualepi"><div class="individualinnerepi hvr-box-shadow-outset  hvr-sweep-to-bottom"> <img src="'+ foto +'" style="width: 185px; height: 104px"/>'+seasonsbody+'</div></div>');
			}
		}
	},
	error : function(){
		console.log("ended related ajax trakt error")
	},
	complete: function()
	{
	}
	
	//timeout: timeouttime // sets timeout to 3 seconds
})
}

/**** CLICACOLLECTION ****/
clicacollection = function()
{
		//abre colecao
		$("#colecoestitle").click
		(
			function (e) 
			{
				e.stopPropagation();
				e.preventDefault();
				e.stopImmediatePropagation();
				$("#loadingscreen").show();
				//obter colecao
				if(!colecaojafez)
				{
					collection[0].htmltodo ="";
					
					$.ajax({
						url: '/php/colecao_checkrow_retrieve.php',  //Server script to process data
						type: 'POST',
						dataType: 'json',
						data: {
							CId: movierow.CId,
							CTmdbId:movierow.CTmdbId,
							LaId:movierow.LaId
						},
						success: function(data)
						{
							datatmdbcollection=data;
							collection[0].name=datatmdbcollection.CN;
							collection[0].overview=datatmdbcollection.CO;
							collection[0].poster=datatmdbcollection.CPp;
							collection[0].length=datatmdbcollection.filmes.length;
							//escreve la a colecao
							if(!collection[0].poster)
							{
								$("#colecaoposter").attr("src", filme.posterpath.replace("wsize", tamanhopostercollection));
							}			
							else
							{
								$("#colecaoposter").attr("src", collection[0].poster.replace("wsize", tamanhopostercollection))
							}
							$("#colecaotitulo").text(collection[0].name)
							$("#colecaooverview").text(collection[0].overview)
							
							for (i = 1; i <= collection[0].length; i++) 
							{
								collection.push(new Object());
								collection[i].id=datatmdbcollection.filmes[i-1].MTmdbId;
								collection[i].title=datatmdbcollection.filmes[i-1].MN;
								if(datatmdbcollection.filmes[i-1].MY)
								{
									collection[i].year = datatmdbcollection.filmes[i-1].MY;
								}
								else
								{
									collection[i].year ="";
								}
								if(!datatmdbcollection.filmes[i-1].MPp)
								{
									foto="../img/noposter.png"
								}
								else
								{
									foto=datatmdbcollection.filmes[i-1].MPp.replace("wsize", tamanhoactors);
								}
								collectionsbody="<b>" + collection[i].title + "</b><br>"+collection[i].year;
								collection[0].htmltodo = collection[0].htmltodo+'<div id="colecao' + i+'" class="aloneindividualcol" ><div class="individualinnercol hvr-box-shadow-outset  hvr-sweep-to-bottom"><img class="imgcollection" src="'+ foto +'" style="width: 60px; height: 90px"/><div class="personagemdivcol">'+ collectionsbody + "</div></div></div>";
							}
							
							$("#colecoesfilmes").html(collection[0].htmltodo)
							colecaojafez=true;
						},
						complete: function(){
							abasshowhide("colecoes");
							//clica filmes da colecao
							for(g=1; g<=collection[0].length; g=g+1) 
							{
								(function (g) 
								{
									$("#colecao" + g).click
									(
										function (e) 
										{
											e.stopPropagation();
											e.preventDefault();
											e.stopImmediatePropagation();
											$("#loadingscreen").show();
											filme.tmdbid = collection[g].id;
											infodofilmefuncao();
											return false;
										}
									)				
								}(g))
							}
							resizeecra();
						}
					})
				}
				else
				{
					abasshowhide("colecoes");
					resizeecra();
				}
				return false;
			}
		)			
}

/**** CLICATRAILER ****/
function clicatrailer()
{
		console.log("funcaotrailer")
		var trailerindex=0;
		//TRAILERRR
		$('#trailertitle, #behindthescenestitle').click
		(
			function (e) 
			{
				e.stopPropagation();
				e.preventDefault();
				e.stopImmediatePropagation();
				//console.log($(e.target));
				$("#loadingscreen").show();
				ajaxtrailerfeito=$.Deferred();
				if($('#musicbody').is(":visible"))
				{
					$('#musicbody').empty();
					abasshowhide('music');
					removeumusica=true;
				}
				if(movieouserie=="person" || language=="en")
					filme.original_title=filme.title;
				$(".arrowsyt").fadeTo(0,0);
				if((!trailerjafez && $(e.target).is('#trailertitle')) || (!behindthescenesjafez && $(e.target).is('#behindthescenestitle')))
				{
					if($(e.target).is('#trailertitle'))
					{
						columnv="THr";
						phpfilev="trailer.php";
						tablev="trailer_media";
					}
					else
					{
						columnv="BsHr";
						phpfilev="behindsc.php";
						tablev="behindsc_media";
					}
					$.ajax({
						url: '/php/abas_checkrow_retrieve.php',  //Server script to process data
						type: 'POST',
						dataType: 'json',
						data: {
							MId: movierow.MId,
							column:columnv,
							table:tablev,
							phpfile:phpfilev
						},
						success: function(data){
							trailerarray=data;
							if(trailerarray[0])
							{
								$("#trailerexterior").append('<iframe id="trailer" src="'+trailerarray[0]+'" frameborder="0" allowfullscreen></iframe>')
								$("#videoexterior").toggle();
							}
							else
							{
								$("#trailerbody").text("We were not able to find a trailer");
								abasshowhide("trailer");
							}
							resizeecra();
							ajaxtrailerfeito.resolve();
							trailerindex=0;
							filme.trailerlength=trailerarray.length-1;
							if($(e.target).is('#trailertitle'))
							{
								trailerjafez=true;
								behindthescenesjafez=false;
							}
							else
							{
								behindthescenesjafez=true;
								trailerjafez=false;
							}
							$("#loadingscreen").hide();
						}
					});
				}
				else
				{
					if(trailerarray[0])
					{
						$("#videoexterior").toggle();
						$("#trailerexterior").append('<iframe id="trailer" src="' + trailerarray[trailerindex] + '" frameborder="0" allowfullscreen></iframe>');
					}
					else
					{
						$("#trailerbody").text("We were not able to find a trailer");
						abasshowhide("trailer");
					}				
					ajaxtrailerfeito.resolve();
					$("#loadingscreen").hide();
				}			
				
				$("#videoexterior, #trailer").unbind( "mousemove" );
				$("#videoexterior, #trailer").unbind( "mouseleave" );
				$( "#arrowytleft").unbind( "click" );
				$( "#arrowytright").unbind( "click" );
				$.when(
					ajaxtrailerfeito
				).then(function()
				{
					$("#loadingscreen").hide();					
					g = null;
					i = null;
					$("#videoexterior, #trailer").mousemove(function() {
						if(trailerindex==0)
						{
							$("#arrowytleft").fadeTo(5,0);
						}
						else
						{
							$("#arrowytleft").fadeTo(5,1);
							clearTimeout(g);
							g=setTimeout(function () {
								$("#arrowytleft").fadeTo(5,0);
							}, 1000);
						}
						if(trailerindex==filme.trailerlength)
						{
							$("#arrowytright").fadeTo(5,0);
							return false
						}
						else
						{
							$("#arrowytright").fadeTo(5,1);
							clearTimeout(i);
							i=setTimeout(function () {
								$("#arrowytright").fadeTo(5,0);
							}, 1000);
						}
					}).mouseleave(function() {
						$("#arrowytleft, #arrowytright").fadeTo(5,0);
					});
					
					
					$('#arrowytleft').click
					(
						function (e) 
						{
							e.stopPropagation();
							e.preventDefault();
							e.stopImmediatePropagation();
							if(trailerindex==0)
							{
								return false
							}
							$("#trailer").remove();
							trailerindex=trailerindex-1;
							$("#trailerexterior").append('<iframe id="trailer" src="' + trailerarray[trailerindex] + '" frameborder="0" allowfullscreen></iframe>');
							resizeecra();	
						}
					)
					
					$('#arrowytright').click
					(
						function (e) 
						{
							e.stopPropagation();
							e.preventDefault();
							e.stopImmediatePropagation();
							if(trailerindex==filme.trailerlength)
							{
								return false
							}
							$("#trailer").remove();
							trailerindex=trailerindex+1;
							$("#trailerexterior").append('<iframe id="trailer" src="' + trailerarray[trailerindex] + '" frameborder="0" allowfullscreen></iframe>');
							resizeecra();							
						}
					)
					$('#videoexterior').click
					(
						function (e) 
						{
							e.stopPropagation();
							e.preventDefault();
							e.stopImmediatePropagation();
							$("#videoexterior").hide();
							$("#trailer").remove();
						}
					).children().click(
						function (e) 
						{
							e.stopPropagation();
							e.preventDefault();
							e.stopImmediatePropagation();
							return false;
					});
				})
		}
		)
		

		console.log("FIM funcaotrailer")
}

/**** INFORMACOESHOVER ****/
informacoeshover = function()
{
	console.log("informacoeshover")
	elementhover("question", "informacao");
	elementhover("logoaverage", "informacao2");
	elementhover("questionfeedback", "feedbacktitlebody");
	console.log("FIM informacoeshover")
}

/*** ELEMENTHOVER ***/
elementhover = function(element, elementshow)
{
	$('#'+element).hover
	(
		function () 
		{
			$('#'+elementshow).show();
		},
		function () 
		{
			$('#'+elementshow).hide();
		}
	)	
}

/**** IMFEELINGLUCKY ****/
imfeelinglucky = function () 
{
	$('#imfeelinglucky').click(
		function (e) 
		{
			e.stopPropagation();
			e.preventDefault();
			e.stopImmediatePropagation();
			console.log("imfeelinglucky")
			$("#loadingscreen").show();
			//escolher em que procura
			min = 1;
			max = 2;
			emqueprocura = Math.floor(Math.random() * (max - min + 1)) + min;
			if(emqueprocura==1)
			{
				procura=top_rated[movieouserie];
			}
			else if(emqueprocura==2)
			{
				procura=po_pular[movieouserie];
			}			
			/*
			else if(emqueprocura==3)
			{
				procura="now_playing";
			}			
			else if(emqueprocura==4)
			{
				procura="upcoming";
			}
			*/
			//escolher pagina e posicaodapagina
				min = 1;
				max = 50;
				page = Math.floor(Math.random() * (max - min + 1)) + min;
				min = 0;
				max = 19;
				resultonpage = Math.floor(Math.random() * (max - min + 1)) + min;
				$.ajax({
					url : "http://api.themoviedb.org/3/" + movieouserie + procura + "?&api_key=" + apikey + "&language=" + language + "&page=" + page,
					dataType : 'json',
					//async : false,
					success : function (data) 
					{
						if(!data.results[resultonpage])
						{
							errorimfeelinglucky();
						}
						else
						{
							filme.tmdbid = data.results[resultonpage].id;
							infodofilmefuncao();
						}
					},
					error : errorimfeelinglucky = function () 
					{
						console.log("error im feeling lucky")
						min = 1;
						max = 50;
						page = Math.floor(Math.random() * (max - min + 1)) + min;
						min = 0;
						max = 19;
						resultonpage = Math.floor(Math.random() * (max - min + 1)) + min;;
						$.ajax({
							url : "http://api.themoviedb.org/3/" + movieouserie + procura + "?&api_key=" + apikey + "&language=" + language + "&page=" + page,
							dataType : 'json',
							//async : false,
							success : function (data) 
							{
									if(!data.results[resultonpage])
									{
										errorimfeelinglucky();
									}
									filme.tmdbid = data.results[resultonpage].id;
									infodofilmefuncao();
							}
							})
					}
				})
			$('#sugestoes').hide();
			console.log("FIM imfeelinglucky")
	})
}

/**** CLICAFACEBOOKCOMENTARIOS ****/
clicafacebookcomentarios = function() 
{
	facebookexecuted = false;
	$("#fbdiv").click
	(
		function (e) 
		{
			e.stopPropagation();
			e.preventDefault();
			e.stopImmediatePropagation();
			console.log("facebookcomentarios")
			if (!facebookexecuted)
			{
				facebookexecuted = true;
				(function(d, s, id) 
				{
					var js, fjs = d.getElementsByTagName(s)[0];
					if (d.getElementById(id)) return;
					js = d.createElement(s); js.id = id;
					js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.4&appId=1642630292662198";
					fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));
			}
			else
			{
				return false;
			}
			
			console.log("FIM facebookcomentarios")
			
		}
	);
};

/**** CLICAFEEDBACKFUNCAO ****/
clicafeedbackfuncao = function() 
{
	$('#feedbackform').submit
	(
		function (e)
		{
			e.preventDefault();
			e.stopPropagation();
			console.log("feedbackform");
			
			$.getScript("js/html2canvas.js", function()
			{
				html2canvas(document.body, {
					onrendered: function(canvas) {
					//document.body.appendChild(canvas);
					$('#img_val').val(canvas.toDataURL("image/png"));
					
					var formData = new FormData($('form#feedbackform')[0]); // use "[0]" <- important
					formData.append('dadoslog', JSON.stringify(logData));
					// you can append aditional values (regular text): formData.append("be",logmebehave);
					$.ajax({
						url: '/php/email.php',  //Server script to process data
						type: 'POST',
						data: formData,
						success: function()
						{
							$("#rodapebody").hide();
							$('#afterfeedback').show();
							console.log("FIM feedbackform");
						},
						//Options to tell jQuery not to process data or worry about content-type.
						cache: false,
						contentType: false,
						processData: false
					 });
					console.log("FIM funcaofeedbackclick+canvas");
				}
				});	
			});
			return false;
		}
	);
};

/**** CLICAADVANCEDSEARCH ****/
clicaadvancedsearch = function(){
	$('#advancedsearchbutton, #advancedsearchdiv').hover
	(
		function () 
		{
			$('#advancedsearchdiv').show();
		}
	)
	$('#advancedsearchdiv, #cabecalho').hover
	(
		function () 
		{
		},
		function () 
		{
			if(ecra!=6)
				$('#advancedsearchdiv').hide();
		}
	)
	
	$('#advancedsearch').click
	(
		function (e) 
		{
			e.stopPropagation();
			e.preventDefault();
			e.stopImmediatePropagation();
			$("#loadingscreen").show();

			//generos
			with_genres=$("#selectgenre").val();
			
			//sort
			sort_by.id=$("#selectsort").val();
			
			//anos
			gy=$("#greateryear").val();
			ly=$("#loweryear").val();

			//cast
			castas=$("#castas").val();
			
				
			//crew
			crewas=$("#crewas").val();

			advancedsearchfuncao();
		}
	)
}

/*** ADVANCEDSEARCHFUNCAO ***/
function advancedsearchfuncao()
{
	console.log("advancedsearchfuncao")
	if(movieouserie=="person")
	{
		movieouserie=movieouserieantigo;
		$("#mos"+movieouserie).prop('checked', true);
	}
	sort_by.name=sort_bypossibilities[sort_by.id][movieouserie];
	$("#movie").val("");
	page=1;
	$("#filmesas").empty();
	$("#loadmoreas").empty();
	sugestaoas=[];
	//anos
	if(isNaN(gy) || !gy)
	{
		primary_release_dategte="";
		gy="";
		if(isNaN(ly) || !ly)
		{
			primary_release_datelte="";
			ly="";
		}
		else
		{
			primary_release_datelte=ly+"-12-31"
		}
	}
	else
	{				
		primary_release_dategte=gy+"-01-01"
		if(isNaN(ly) || !ly)
		{
			primary_release_datelte="";
			ly="";
		}
		else
		{
			primary_release_datelte=ly+"-12-31"
		}
	}
	//cast
	with_cast="";
	with_castnames="";
	with_castn=1;
	ajaxwith_cast.resolve();
	if(castas && movieouserie=="movie")
	{
		castasarray = castas.split(",")
		ajaxwith_cast=$.Deferred();
		for(i=0; i<castasarray.length; i++)
		{
			if(castasarray[i])
			{
				$.ajax({
						url : 	"http://api.themoviedb.org/3/search/person"+"?&api_key=" + apikey + "&query="+castasarray[i],
						dataType : 'json',
						//async : false,
						success : function (data)
						{
							if(data.results[0])
							{
								with_cast=with_cast+data.results[0].id+",";
								with_castnames=with_castnames+data.results[0].name+",";
							}
							if(with_castn==castasarray.length)
								ajaxwith_cast.resolve();
							with_castn++;
						},
						error: function()
						{
							if(with_castn==castasarray.length)
								ajaxwith_cast.resolve();
							with_castn++;
						}
				})
			}
			else
			{
				if(with_castn==castasarray.length)
					ajaxwith_cast.resolve();
				with_castn++;
			}
		}
	}
	//crew
	with_crew="";
	with_crewnames="";
	with_crewn=1;
	ajaxwith_crew.resolve();
	if(crewas && movieouserie=="movie")
	{
		crewasarray = crewas.split(",")
		ajaxwith_crew=$.Deferred();
		for(i=0; i<crewasarray.length; i++)
		{
			if(crewasarray[i])
			{
				$.ajax({
						url : 	"http://api.themoviedb.org/3/search/person"+"?&api_key=" + apikey + "&query="+crewasarray[i],
						dataType : 'json',
						//async : false,
						success : function (data)
						{
							if(data.results[0])
							{
								with_crew=with_crew+data.results[0].id+",";
								with_crewnames=with_crewnames+data.results[0].name+",";
							}
							if(with_crewn==crewasarray.length)
								ajaxwith_crew.resolve();
							with_crewn++;
						},
						error: function()
						{
							if(with_crewn==crewasarray.length)
								ajaxwith_crew.resolve();
							with_crewn++;
						}
				})
			}
			else
			{
				if(with_crewn==crewasarray.length)
					ajaxwith_crew.resolve();
				with_crewn++;
			}
		}
	}
	
	$.when(
		ajaxwith_cast,
		ajaxwith_crew
	).then(function(){
		ajaxadvancedsearch();
	})	
}

/** AJAXADVANCEDSEARCH **/
ajaxadvancedsearch=function()
{
	console.log("ajaxadvancedsearch")
	$("#castas").val(with_castnames);
	$("#crewas").val(with_crewnames);
	$("#greateryear").val(gy);
	$("#loweryear").val(ly);
	$("#selectgenre").val(with_genres);
	$("#selectsort").val(sort_by.id);	
	
	$.ajax({
			url : 	"http://api.themoviedb.org/3/discover/" + movieouserie + "?&api_key=" + apikey + "&language=" + language + releasedatesearch.greater[movieouserie] + primary_release_dategte + releasedatesearch.lower[movieouserie] + primary_release_datelte + "&sort_by=" + sort_by.name + "&with_genres=" + with_genres + "&page=" + page + "&with_cast=" + with_cast + "&with_crew=" + with_crew,
			dataType : 'json',
			//async : false,
			success : function (data)
			{
					datatmdbas=data;
					total_pages=data.total_pages;
					for(i=0; i<data.results.length; i++)
					{
						$("#filmesas").append('<div class="postersas" id="postersas'+ ((page-1)*20+i).toString() +'"><div id="sas'+((page-1)*20+i).toString()+'a" class="supratextoas"><div class="textoas"><b id="sas'+((page-1)*20+i).toString()+'"></b><br><div id="descriptas'+((page-1)*20+i).toString()+'"></div></div></div></div>');
						sugestaoas.push(new Object());
						//id
						sugestaoas[(page-1)*20+i].identificacao = data.results[i].id;
						//movie
						sugestaoas[(page-1)*20+i].title = data.results[i][titleaqui[movieouserie]];
						if(data.results[i][release_date[movieouserie]])
							sugestaoas[(page-1)*20+i].year = data.results[i][release_date[movieouserie]].substring(0, 4);
						else
							sugestaoas[(page-1)*20+i].year = "";
						//generos
						sugestaoas[(page-1)*20+i].genresname=generosfuncao(data, i, "results");//define o sugestaoas[i].genresname
						//poster
						sugestaoas[(page-1)*20+i].posterpath = data.results[i][poster_path];
					}
			},
			error: function()
			{
				console.log("advancedsearch error")
			},
			complete: function()
			{
					if(page<total_pages)
					$("#loadmoreas").append('<input id="loadmoreasbutton" type="button" value="LOAD MORE" style="margin: 10px; font-weight: 900; font-size: 150%; cursor: pointer"/>')
					for(i=0; i<datatmdbas.results.length; i++)
					{	
						$('#sas' + ((page-1)*20+i).toString()).text(sugestaoas[(page-1)*20+i].title + " (" + sugestaoas[(page-1)*20+i].year + ")");
						$('#descriptas' + ((page-1)*20+i).toString()).text(sugestaoas[(page-1)*20+i].genresname);
						//poster
						$('#sas' + ((page-1)*20+i).toString() +'a').css("background", "transparent url(" + base_url + tamanhopostersugestoes + sugestaoas[(page-1)*20+i].posterpath + ") 10px 0px no-repeat");
						$('#sas' + ((page-1)*20+i).toString() +'a').css("background-size", "auto 60px");
						
						(function (i) 
						{
							$('#postersas'+((page-1)*20+i).toString()).click
							(
								function (e) 
								{
									e.stopPropagation();
									e.preventDefault();
									e.stopImmediatePropagation();
									$("#loadingscreen").show();
									posterasid=$(this)[0].id.substr(9, $(this)[0].id.length);
									filme.tmdbid = sugestaoas[posterasid].identificacao;
									infodofilmefuncao();
								}
							)			
						}(i))
						
					}
					cleaneverything();
					showhide(6);
					
					$('#loadmoreasbutton').click
					(
						function (e) 
						{
							e.stopPropagation();
							e.preventDefault();
							e.stopImmediatePropagation();
							$("#loadmoreasbutton").remove();
							page=page+1;
							ajaxadvancedsearch();
						}
					)
			},
			timeout: timeouttime // sets timeout to 3 seconds
		})
}

/**** SECLICAFUNCTION 
function seclicafunction(oqueclica)
{
$('#'+oqueclica+'1').click
(
	function (e) 
	{
		e.stopPropagation();
		e.preventDefault();
		e.stopImmediatePropagation();
		if(!naofaznada[oqueclica]) return false
		$('#mais'+oqueclica).toggle();
		if($('#mais'+oqueclica).is(":visible")) arrow[oqueclica]="up";
		else arrow[oqueclica]="down";
		$("#"+oqueclica+"1").css("background", 'transparent url(../img/'+ arrow[oqueclica] +'arrow.png) left 8px no-repeat');
		$("#"+oqueclica+"1").css("background-size", "15px auto");
	}
)
}****/

/***** CONTAVISITANTE *****/
function contavisitante (id)
{
	$.ajax({
		url: '/php/contavisitante.php',  //Server script to process data
		type: 'POST',
		data: {id:id}
	 });
}

/***** FUNCAOQUEGUARDATODOSOSLOGS *****/
function funcaoqueguardatodososlogs()
{
	var logData = [];
	(function () {
		var log = console.log,
			error = console.error,
			warn = console.warn,
			info = console.info;

		console.log = function () {
			var args = Array.prototype.slice.call(arguments)
			log.apply(this, args );
			logData.push({level: "log", arguments: args.toString()});
		};
		console.error = function () {
			var args = Array.prototype.slice.call(arguments)
			error.apply(this, args );
			logData.push({level: "error", arguments: args.toString()});
		};
		console.warn = function () {
			var args = Array.prototype.slice.call(arguments)
			warn.apply(this, args );
			logData.push({level: "warn", arguments: args.toString()});
		};
		console.info = function () {
			var args = Array.prototype.slice.call(arguments)
			info.apply(this, args );
			logData.push({level: "info", arguments: args.toString()});
		};
	}());
} 

/****** POPSTATE ******/
window.addEventListener("popstate", function(e) {
	if(e.state)
	{
		console.log("POPSTATE:"+e.state)
		veiodoback=true;
		if(e.state.language)
		{
			language=e.state.language;
			movieouserie=e.state.movieouserie;		
			
			if(e.state.tmdbid)
			{		
				console.log("POPSTATE ecra1")
				filme.tmdbid=e.state.tmdbid;
				assinginitialinfofuncao();
				infodofilmefuncao();
			}
			else if (e.state.sort_by)
			{
				console.log("POPSTATE advanced search")
				ly=e.state.ly;
				gy=e.state.gy;
				sort_by.id=e.state.sort_by;
				with_genres=e.state.with_genres;
				castas=e.state.castas;
				crewas=e.state.crewas;
				assinginitialinfofuncao();	
				advancedsearchfuncao();
			}
			else if (e.state.homepage)
			{
				console.log("POPSTATE homepage")
				assinginitialinfofuncao();
				history.replaceState({homepage: true, language:e.state.language, movieouserie:e.state.movieouserie}, null, "#"+e.state.language+"/"+e.state.movieouserie);
				$('#movie').val("");			
				showhide(0);
			}
		}
		else
		{
			console.log("POPSTATE homepage")
			assinginitialinfofuncao();
			history.replaceState({homepage: true}, null, window.location.pathname);
			$('#movie').val("");
			showhide(0);
		}
	}
	console.log("FIM POPSTATE")
});


/*** RETRIEVESONGS***/
retrievesongs=function()
{
	$("#musictitle").click
	(
		function (e) 
		{
			e.stopPropagation();
			e.preventDefault();
			e.stopImmediatePropagation();
			$("#loadingscreen").show();
			
			console.log("clicoumusic")
			if(!musicjafez)
			{
				$.ajax({
						url: '/php/abas_checkrow_retrieve.php',  //Server script to process data
						type: 'POST',
						dataType: 'json',
						data: {
							MId: movierow.MId,
							column:"SHr",
							table:"media",
							phpfile:"soundtrack.php"
						},
						success: function(data){
							musicjafez=true;
							removeumusica=false;
							filme.musicplaylistid=data[0];
							console.log(filme.musicplaylistid);
							if(filme.musicplaylistid)
							{
								$("#musicbody").append('<iframe id="musiciframe" src="'+ filme.musicplaylistid +'" frameborder="0" allowfullscreen></iframe>')
								abasshowhide("music");
								resizeecra();
							}
							else
							{
								$("#musicbody").append('We were not able to find a soundtrack.')
								abasshowhide("music");
								resizeecra();
							}

						}
					});
			}
			else
			{
				if(removeumusica)
				{
					if(filme.musicplaylistid)
					{
						$("#musicbody").append('<iframe id="musiciframe" src="'+ filme.musicplaylistid +'" frameborder="0" allowfullscreen></iframe>')
					}
					else
					{
						$("#musicbody").append('We were not able to find a soundtrack.')
					}
				}
				abasshowhide("music");
				resizeecra();
				musicjafez=true;
			}
		return false;
		}
	)
	
}

function relatedmovies()
{
	/*
			$.ajax({
				url : "https://api.tviso.com/media/related?auth_token=" + apikeytviso + "&idm=" + filme.tvisoid + "&mediaType=" + filme.tvisomediaType,
				dataType : 'json',
				//async : false,
				success : function (data)
				{
				},
				error : function(){
					console.log("ended related ajax tviso error ")
				},
				complete: function()
				{
				}
				
				//timeout: timeouttime // sets timeout to 3 seconds
			})
			*/
			
			/*
			$.ajax({
				url : "https://api-v2launch.trakt.tv/" + traktmovieouserie[movieouserie] + "/" + filme.omdbid + "/related",
				dataType : 'json',
				headers: 
				{
					"Content-Type":"application/json",
					"trakt-api-version":"2",
					"trakt-api-key": apikeytrakt,
				},
				//async : false,
				success : function (data)
				{
				},
				error : function(){
					console.log("ended related ajax trakt error")
				},
				complete: function()
				{
				}
				
				//timeout: timeouttime // sets timeout to 3 seconds
			})
			*/
			
			$.ajax({
				url : "http://api.themoviedb.org/3/" + movieouserie + "/" + filme.tmdbid + "/similar?&api_key=" + apikey + "&language=" + language,
				dataType : 'json',
				//async : false,
				success : function (data)
				{
				},
				error : function(){
					console.log("ended related ajax trakt error")
				},
				complete: function()
				{
				}
				
				//timeout: timeouttime // sets timeout to 3 seconds
			})
}

function welcomemessage()
{
	if(!getCookie("jacaesteve"))
	{
		console.log("nunca ca esteve")
		d1=new Date();
		setCookiedays("jacaesteve", d1, 10*365)
		$("#welcomemessage").text("CONGRATULATIONS ON ARRIVING FOR THE FIRST TIME TO THE BEST SITE IN THE WORLD!");
		contavisitante(viewcounterid["unique"]);
	}
	else
	{
		$("#welcomemessage").text("WELCOME BACK!!!!");
	}
	$("#welcomemessage").show();
	setTimeout(function () {
		$("#welcomemessage").hide();
	}, 4000);
}