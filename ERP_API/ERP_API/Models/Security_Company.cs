//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ERP_API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Security_Company
    {
        public int Security_ID { get; set; }
        public int Reserve_ID { get; set; }
        public string Name { get; set; }
        public string Cell { get; set; }
        public string Email { get; set; }
    
        public virtual Reserve Reserve { get; set; }
    }
}
