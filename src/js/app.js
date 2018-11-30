var handleContent = function () {
    var preloader = $('.preloader');
    var ajaxLoader = '<img class="ajax-loader" src="/img/ajax-loader.gif" />';

    $('.btn').click(function (e) {
        e.preventDefault();
		var btn = $(this); //ako zelimo hvatati baš event na ovom gumbu; sada sa console.log vidjet ćemo bas gumb a ne ajax zahtejv kao dolje u console.log
							//sada smo sigurni da je to baš taj gumb a ne svi koji imaju klasu btn i samo na njemu radimo neku akciju
	   $.ajax({
            url: "data/users.json",
            type: "GET",
            data: { "id": 1 },
            
			beforeSend: function () {
                //tu stavljaš unbind - vidi dolje objašnjenje 
				//btn.prop('disabled','disabled');  //čak bolji način od unbind je i da dodamo properti disabled i tada na njemu nije moguće ni jedan event odraditi
				preloader.empty();
                preloader.append(ajaxLoader);
            },
            success: function (result, status, xhr) {
                /* Ponkad je potrebno parsirati JSON koji dobijete u rezultatu u js objekt */
                //var users = $.parseJSON(result);
                
				$.each(result, function(key,value){		//iteracija po svim vrijednostima objekta a možemo hvatati ključeve i vrijednosti
					//cosole.log(key);					//console.log(value) - hvatamo vrijednosi pogledaj doma
					var html =''; //varijabla u koju ćemo vratiti podatke za popuniti tbody tablicu u htmlu
					
					html += '<tr>';
					html += '<td>' + value.id + '</td>';	//dohvaćamo vrijednosti iz objekta i odmah kreiramo redak tablice
					html += '<td>' + value.name + '</td>';
					html += '<td>' + value.username + '</td>';
					html += '<td>' + value.email + '</td>';
					html += '</tr>';
					
					$('.users tbody').append(html); //sada ga ispiši u html pod tbody
					
					//console.log(this);   //da vidiš što se hvata --vidjet ćemo da hvatamo ajax
					
					//btn.unbind('click'); //kada želimo maknuti neki event na određenu akciju to radiom s event. u ovom slučaju 
										//nakon prvog klika i punjenja podataka korisnik više neće moći klikati na gumb i puniti stranicu istim podatcima
										//probaj. Stime da se unbind stavlja ne tu već odmah iza reda beforeSend gore - 
				});
            },
            error: function (xhr, status, error) {
                if (error){
                    preloader.empty();
                    preloader.text("An error occured while proccessing your request! Please try again later!");
                    setTimeout(function () {
                        preloader.empty();
                    }, 5000);
                    
                }
            },
            complete: function () {
                preloader.empty();  //ovo zakomentiraj pa ćes viditi poruku ako napraviš grešku u json data --- probaj
            }
        });
    });
};

var App = function () {
    return {
        init: function (element) {
            handleContent();
        }
    }
}();