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
    
    public partial class Asset_Supplier
    {
        public int Asset_Supplier_ID { get; set; }
        public int Asset_ID { get; set; }
        public int Supplier_ID { get; set; }
    
        public virtual Asset Asset { get; set; }
        public virtual Supplier Supplier { get; set; }
    }
}
