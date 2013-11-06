exports.index = function (req, res) {
    var db = require('../lib/db')('customer');

    db.find({ paid: true})
      .sort({created_on: -1}, function (err, paidCustomers) {
        res.render('admin', { title: 'Members and donations', customers:paidCustomers });
    });

};

exports.exportCustomers = function(req, res){
    var customers ={};
    customers.cols = [{
        caption:'string',
        type:'string',
        beforeCellWrite:function(row, cellData){
             return cellData.toUpperCase();
        },
        width:28.7109375
    },{
        caption:'date',
        type:'date',
        beforeCellWrite:function(){
            var originDate = new Date(Date.UTC(1899, 12, 29));
            return function(row, cellData, eOpt){
                  if (eOpt.rowNum%2){
                    eOpt.styleIndex = 1;
                  }  
                  else{
                    eOpt.styleIndex = 2;
                  }
              return (cellData - originDate) / (24 * 60 * 60 * 1000);
            } 
        }()
    },{
        caption:'bool',
        type:'bool'
    },{
        caption:'number',
         type:'number'                
      }];
      customers.rows = [
         ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
         ["e", new Date(2012, 4, 1), false, 2.7182],
          ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.2]   
      ];
      var result = nodeExcel.execute(customers);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats');
      res.setHeader("Content-Disposition", "attachment; filename=" + "CustomersReport.xlsx");
      res.end(result, 'binary');
}