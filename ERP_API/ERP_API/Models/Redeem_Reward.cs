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
    
    public partial class Redeem_Reward
    {
        public int Redeem_ID { get; set; }
        public int Ranger_ID { get; set; }
        public string Voucher_code { get; set; }
        public System.DateTime DateTime { get; set; }
        public Nullable<int> Product_Reward_ID { get; set; }
        public Nullable<int> Event_Reward_ID { get; set; }
    
        public virtual Event_Reward Event_Reward { get; set; }
        public virtual Product_Reward Product_Reward { get; set; }
        public virtual Ranger Ranger { get; set; }
    }
}
