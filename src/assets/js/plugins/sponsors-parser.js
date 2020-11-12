//parse sponsors.csv file to create cards on Our Sponsors page
klrn.parseSponsorsCSV = function(csvData) {
  if (!csvData) return;  
  
  var data = klrn.parseCSV(csvData); 
  var target = document.querySelector('#sponsor_cards'); 
  var fragment = document.createDocumentFragment(); //add everything to this, then make 1 insertion  
  var i, mainDiv, innerDiv, imgLink, img, graph;
  var pTag, spanTagName, aTag, spanTagType;
  var level = 0; subheads = ['','American Master - $2,500',
                             'SuperNOVA - $1,500',
							 'Great Performer - $500'];
  var subheadsClasses = ['','american_master',
                         'supernova',
						 'great_performer'];							 
  
  if (!target) return;
  //console.log(data);
  
  //sort data by levels
  data.sort(function(a,b){return a.CATEGORY-b.CATEGORY});  
  
  var createSubhead = function(level) {	  
	subhead = document.createElement('h3');
	subhead.className = subheadsClasses[level];
	subheadText = document.createTextNode(subheads[level]);
	subhead.appendChild(subheadText);
	fragment.appendChild(subhead);	  
  }
  
  var createSponsorLink = function(i) {
	pTag = document.createElement('p');
	pTag.className = 'col-lg-4 col-12';
	spanTagName = document.createElement('span');
	spanTagName.className = 'lead'; 
    spanTagName.appendChild(document.createTextNode(data[i].SPONSOR));	
	if (data[i].LINK) {
	  aTag = document.createElement('a');
      aTag.href = data[i].LINK;
      aTag.setAttribute('target', '_blank');  
      aTag.appendChild(spanTagName);
	  pTag.appendChild(aTag);  
	}
	else pTag.appendChild(spanTagName);	
    pTag.append(document.createElement('br'));
	spanTagType = document.createElement('span');
	spanTagType.className = 'sponsor_type';
	spanTagType.append(document.createTextNode(data[i].SPONSOR_TYPE + ': '));
	pTag.appendChild(spanTagType);
    pTag.append(data[i].PROGRAMMING);	
	fragment.appendChild(pTag); 
  }	  
  
  var createCard = function(i) {
	//create elements
    mainDiv = document.createElement('div');
    mainDiv.className = 'col-lg-2 col-md-3 col-sm-4 col-6';
    
    innerDiv = document.createElement('div');
    innerDiv.className = 'card box-shadow';
    
    if (data[i].LINK !== '') {
      imgLink = document.createElement('a'); 
      imgLink.href = data[i].LINK;
      imgLink.setAttribute('target', '_blank');
    }
    
    img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = '../assets/img/sponsors/' + data[i].LOGO;
    img.alt = data[i].SPONSOR;
    
    graph = document.createElement('p');
    graph.innerHTML = '<span>' + data[i].SPONSOR_TYPE + '</span>'
                      + '<br>' + data[i].PROGRAMMING; 
    
    //nest elements       
    mainDiv.appendChild(innerDiv);
    if (data[i].LINK !== '') {
      innerDiv.appendChild(imgLink);
      imgLink.appendChild(img);      
    }
    else {    
      innerDiv.appendChild(img);   
    }      
    innerDiv.appendChild(graph);
    
    //attach to dom fragment that will be inserted
    fragment.appendChild(mainDiv);
  }
  
  //driver loop to put elements together
  for (i=0;i<data.length;i++) {
    if (data[i].SPONSOR === '' || data[i].SPONSOR_TYPE === '' || 
        data[i].PROGRAMMING === '' || 
		data[i].GIVING_STATUS_CURRENT.toLowerCase() !== 'y') {
      continue;
    }
	
	//level subheads
	if (parseInt(data[i].CATEGORY) !== level) {
		level = parseInt(data[i].CATEGORY);
		createSubhead(level);
	}
    
	//level 1 and 2 sponsors	
    if (parseInt(data[i].CATEGORY) < 3) {
  	    createCard(i);
  	}
	
	//level 1 sponsors
	else createSponsorLink(i);	
  }
  
  //insert all cards 
  target.appendChild(fragment);     
}

klrn.loadSponsors = function() {
  var request = new XMLHttpRequest();
  if (!request) return;
  
  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      klrn.parseSponsorsCSV(this.responseText);
    }
  }  
  request.open('GET', '../data/sponsors.csv', true);
  request.send();    
}