const express=require('express');
const app =express();
const controller=require('./controllers');

app.set('view engine','ejs');
app.use(express.static('./public'));
app.use(express.static('./uploads'));

app.get('/upload',controller.upload);
app.post('/upload',controller.uploading);
app.get('/create',controller.create);
app.post('/create',controller.creating);
app.get('/delete/:albumname/:name',controller.deletePic);
app.get('/delete/:albumname',controller.deleteDir);
app.get('/:albumname',controller.showPic);
app.get('/',controller.showAlbum);

app.use(controller.showError);
app.listen(3000,()=>{
    console.log('Server is Ready...');
});
