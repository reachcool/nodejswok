var soap= require('soap'),
	Cookie= require('soap-cookie');


		var url = 'http://search.webofknowledge.com/esti/wokmws/ws/WOKMWSAuthenticate?wsdl';
		var surl = 'http://search.webofknowledge.com/esti/wokmws/ws/WokSearchLite?wsdl';
		var args= {
				queryParameters:{
					databaseId:'WOS',
					userQuery:'AU=(Hao Xihong) and CI=(Baotou)',
					editions:{
						
							collection:'WOS',
							edition:'SCI'
						
					},
					timeSpan:{
						begin:'2015-01-01',
						end:'2015-08-31'
					},
					queryLanguage:'en',
					},
					retrieveParameters:{
						firstRecord:1,
						count:50,
						sortField:{
							name:'CY',
							sort:'D'
						}

				}
		};

function soapwok(cb){
		var results=[];
		soap.createClient(url, function(err, client) {
				console.log(err);
				//console.log(client);
		      client.authenticate( function(err, result) {
		          console.log(err);
		          console.log(result.return);
		          soap.createClient(surl,function(err,sclient){
		          		console.log(err);
						//console.log(sclient);
						//console.log(sheader);
						//sclient.setHeader('Cookie',{'SID':result.return});
						var cookies = new Cookie(client.lastResponseHeaders);
						sclient.setSecurity(cookies);
						//cookies.addHeaders({"SID":result.return});
		          		//sclient.addSoapHeader(sheader,'WokSearchLiteService','nts','http://woksearchlite.v3.wokmws.thomsonreuters.com');
		          		//sclient.addHeaders('Cookie','SID='+result.return);
		          		console.log(sclient.getSoapHeader);
		          		sclient.search(args,function(err,resu){
		          				console.log('search');
		          				//console.log(err);
		          				//console.log(resu.return.records);

		          				results.push(resu.return.records);
		          				//console.log(results);
		          				cb(results);
		          		});
		          });
		      });
		  });
	//console.log(results);
	//return results;
}
exports.soapwok = soapwok;

