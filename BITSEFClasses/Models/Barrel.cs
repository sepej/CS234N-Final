﻿using System;
using System.Collections.Generic;

namespace BITSEFClasses.Models
{
    public partial class Barrel
    {
        public int BrewContainerId { get; set; }
        public string Treatment { get; set; }

        public virtual BrewContainer BrewContainer { get; set; }
    }
}
