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
    
    public partial class Cellphone
    {
        public int IMEI { get; set; }
        public int Ranger_ID { get; set; }
        public Nullable<bool> Type { get; set; }
        public string OS { get; set; }
    
        public virtual Ranger Ranger { get; set; }
    }
}
