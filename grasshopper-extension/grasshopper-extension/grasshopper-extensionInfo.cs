using System;
using System.Drawing;
using Grasshopper.Kernel;

namespace grasshopper_extension
{
    public class grasshopperextensionInfo : GH_AssemblyInfo
  {
    public override string Name
    {
        get
        {
            return "BIMBlockchain";
        }
    }
    public override Bitmap Icon
    {
        get
        {
            //Return a 24x24 pixel bitmap to represent this GHA library.
            return null;
        }
    }
    public override string Description
    {
        get
        {
            //Return a short string describing the purpose of this GHA library.
            return "";
        }
    }
    public override Guid Id
    {
        get
        {
            return new Guid("3f159cbc-7495-4f29-a3c9-89b7df4485e5");
        }
    }

    public override string AuthorName
    {
        get
        {
            //Return a string identifying you or your company.
            return "";
        }
    }
    public override string AuthorContact
    {
        get
        {
            //Return a string representing your preferred contact details.
            return "";
        }
    }
}
}
