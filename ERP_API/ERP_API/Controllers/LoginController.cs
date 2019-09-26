using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ERP_API.Models;
using System.Web.Http.Cors;
using System.Dynamic;
using System.Net.Mail;
using System.IO;
using OfficeOpenXml;
using System.Linq;
using System.Data.Entity;
using System.Net.Http.Headers;
using System.Data;
using Newtonsoft.Json;

namespace ERP_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        private INF370Entities db = new INF370Entities();
        [System.Web.Http.Route("api/Login/Login")]
        [HttpGet]
        public HttpResponseMessage Login([FromUri] Ranger userDet)
        {
            db.Configuration.ProxyCreationEnabled = false;
            userDet.Password = userDet.Password.Substring(0, 19);
            bool UseInDb = false;
            if (db.Rangers.Where(zz => zz.Email == userDet.Email && zz.Password == userDet.Password).Count() == 1)
            {
                UseInDb = true;
            }
            if (UseInDb)
            {
                userDet = db.Rangers.Where(zz => zz.Email == userDet.Email).FirstOrDefault();
                RefreshGUID(userDet);
                userDet = db.Rangers.Where(zz => zz.Email == userDet.Email).FirstOrDefault();
                List<dynamic> uselit = new List<dynamic>();
                dynamic user1 = new ExpandoObject();
                user1.Ranger = userDet.Ranger_ID;
                user1.GUID = userDet.GUID;
                user1.Correct = true;
                uselit.Add(user1);
                var response1 = Request.CreateResponse(HttpStatusCode.OK, uselit);
                response1.Headers.Add("Access-Control-Allow-Origin", "*");
                return response1;

            }
            else
            {
                var response = Request.CreateResponse(HttpStatusCode.OK, "Access not allowed");
                response.Headers.Add("Access-Control-Allow-Origin", "*");
                return response;
            }

        }
        public void RefreshGUID(Ranger use)
        {
            db.Configuration.ProxyCreationEnabled = false;
            use.GUID = Guid.NewGuid();
            use.GUID_Exp = DateTime.Now.AddMinutes(30);
            var guids = db.Rangers.Where(zz => zz.GUID == use.GUID).Count();
            if (guids > 0)
                RefreshGUID(use);
            else
            {
                var u = db.Rangers.Where(zz => zz.Email == use.Email).FirstOrDefault();
                db.Entry(u).CurrentValues.SetValues(use);
                db.SaveChanges();
            }
        }
        [System.Web.Http.Route("api/Login/LogedIn")]
        [HttpGet]
        public HttpResponseMessage LogedIn([FromUri] Ranger user)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (db.Rangers.Where(zz => zz.Email == user.Email && zz.Email == user.Email).Count() == 1)
            {
                List<dynamic> uselit = new List<dynamic>();
                dynamic user1 = new ExpandoObject();
                user1.Logedin = true;
                uselit.Add(user1);
                var response1 = Request.CreateResponse(HttpStatusCode.OK, uselit);
                response1.Headers.Add("Access-Control-Allow-Origin", "*");
                return response1;
            }
            else
            {
                var response = Request.CreateResponse(HttpStatusCode.OK, "Access not allowed");
                response.Headers.Add("Access-Control-Allow-Origin", "*");
                return response;
            }
        }
        [System.Web.Http.Route("api/Login/ResetOTP")]
        [HttpGet]
        public HttpResponseMessage ResetOTP([FromUri] Ranger userDet)
        {
            db.Configuration.ProxyCreationEnabled = false;
            bool UseInDb = false;
            if (db.Rangers.Where(zz => zz.Email == userDet.Email).Count() == 1)
            {
                UseInDb = true;
            }
            if (UseInDb)
            {
                userDet = db.Rangers.Where(zz => zz.Email == userDet.Email).FirstOrDefault();
                ResetPass(userDet);
                userDet = db.Rangers.Where(zz => zz.Email == userDet.Email).FirstOrDefault();
                List<dynamic> uselit = new List<dynamic>();
                dynamic user1 = new ExpandoObject();
                user1.OTP = userDet.OTP;
                user1.Correct = true;
                uselit.Add(user1);
                var response1 = Request.CreateResponse(HttpStatusCode.OK, uselit);
                response1.Headers.Add("Access-Control-Allow-Origin", "*");
                return response1;

            }
            else
            {
                var response = Request.CreateResponse(HttpStatusCode.OK, "Access not allowed");
                response.Headers.Add("Access-Control-Allow-Origin", "*");
                return response;
            }

        }
        public void ResetPass(Ranger use)
        {
            int _min = 0000;
            int _max = 9999;
            Random _rdm = new Random();
            db.Configuration.ProxyCreationEnabled = false;
            use.OTP = _rdm.Next(_min, _max);
            var guids = db.Rangers.Where(zz => zz.OTP == use.OTP).Count();
            if (guids > 0)
                ResetPass(use);
            else
            {
                var u = db.Rangers.Where(zz => zz.Email == use.Email).FirstOrDefault();
                db.Entry(u).CurrentValues.SetValues(use);
                db.SaveChanges();
            }
            SendEmail(use.Email, use.OTP);
        }
        public bool SendEmail(string Email, int? OTP)
        {
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

                mail.From = new MailAddress("u17055386@tuks.co.za");
                mail.To.Add(Email);
                mail.Subject = "ERP Ranger password reset Request";
                mail.Body = "You have requested to reset your password on the ERP ranger system \n The following OTP can be used to reset your password: \n "+OTP+"\n Thank you for your contribution to the ERP Ranger force. \n Regards, \n ERP Ranger Group";

                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("u17055386@tuks.co.za", "Jandre#2");
                SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);
                return true;
            }
            catch (Exception ex)
            {
                ex.ToString();
                return false;
            }
            
        }
        [System.Web.Http.Route("api/Login/Password")]
        [HttpGet]
        public HttpResponseMessage Password([FromUri] Ranger userDet)
        {
            db.Configuration.ProxyCreationEnabled = false;
            bool UseInDb = false;
            string pass="";
            if (db.Rangers.Where(zz => zz.OTP == userDet.OTP && zz.Email == userDet.Email).Count() == 1)
            {
                pass = userDet.Password;
                UseInDb = true;
            }
            if (UseInDb)
            {
                userDet = db.Rangers.Where(zz => zz.Email == userDet.Email).FirstOrDefault();
                ResetPassNew(userDet,pass);
                userDet = db.Rangers.Where(zz => zz.Email == userDet.Email).FirstOrDefault();
                List<dynamic> uselit = new List<dynamic>();
                dynamic user1 = new ExpandoObject();
                user1.GUID = userDet.GUID;
                user1.Correct = true;
                uselit.Add(user1);
                var response1 = Request.CreateResponse(HttpStatusCode.OK, uselit);
                response1.Headers.Add("Access-Control-Allow-Origin", "*");
                return response1;

            }
            else
            {
                var response = Request.CreateResponse(HttpStatusCode.OK, "Access not allowed");
                response.Headers.Add("Access-Control-Allow-Origin", "*");
                return response;
            }

        }
        public void ResetPassNew(Ranger use,string pass)
        {
            db.Configuration.ProxyCreationEnabled = false;
            pass = pass.Substring(0, 19);
            use.Password = pass;  
                var u = db.Rangers.Where(zz => zz.Email == use.Email).FirstOrDefault();
                db.Entry(u).CurrentValues.SetValues(use);
                db.SaveChanges();
            
        }
        
        [System.Web.Http.Route("api/Login/Export")]
        [HttpGet]
        public HttpResponseMessage Export()
        {
            List<dynamic> toReturn = new List<dynamic>();
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<Audit> Level = db.Audits.Include(zz => zz.Ranger).ToList();
                foreach (Audit Item in Level)
                {
                    dynamic m = new ExpandoObject();
                    m.Audit_ID = Item.Audit_ID;
                    m.Ranger = Item.Ranger.Name + " " + Item.Ranger.Surname;
                    m.Date = Item.dateTime;
                    m.Critical = Item.Critical_data;
                    m.Type = Item.Transaction_Type;
                    toReturn.Add(m);
                }
                using (var p = new ExcelPackage())
                {

                    var ws = p.Workbook.Worksheets.Add("ERP_Audit_Log");
                    var json = JsonConvert.SerializeObject(toReturn);
                    DataTable dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                    ws.Cells.LoadFromDataTable(dt, true);
                    var range = "A1:E" + Convert.ToString(toReturn.Count + 1);
                    ws.Tables.Add(ws.Cells[range], "Audit_log").TableStyle = OfficeOpenXml.Table.TableStyles.None;
                    ws.Cells[range].AutoFitColumns();
                    HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
                    //Stream stream = p.Stream;
                    
                    //OR
                    //Create a file on the fly and get file data as a byte array and send back to client
                    httpResponseMessage.Content = new ByteArrayContent(p.GetAsByteArray());//Use your byte array
                    httpResponseMessage.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                    httpResponseMessage.Content.Headers.ContentDisposition.FileName = "Audit.xlsx";//your file Name- text.xls
                    httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/ms-excel");
                    //response.Content.Headers.ContentType  = new MediaTypeHeaderValue("application/octet-stream");
                   // httpResponseMessage.Content.Headers.ContentLength = p.Stream.Length;
                    httpResponseMessage.StatusCode = System.Net.HttpStatusCode.OK;
                    return httpResponseMessage;
                }
               
                
            }
            catch(Exception err)
            {
                HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
                return httpResponseMessage;
            }
           
        }
        


        }
}

