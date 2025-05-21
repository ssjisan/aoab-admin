import Certificate from "../../../../Common/Certificate/Certificate";

export default function CertificateDesign() {
  return (
    <Certificate
        name="Jhon Doe"
        course="Networking Basic"
        signatureUrl="/signatures/dr-smith-sign.png"
        // backgroundUrl="certificate.png"
        backgroundUrl="certificate_main.png"
        asRole="Faculty"
        date="April 20-21, 2050"
        location="Khulna, Bangladesh"
        firstSignature={"/dummy1.png"}
        firstSignatureName={"Jack Ma"}
        firstSignatureDesignation={"Global Steering Committee Head"}
        secondSignature={"/dummy2.png"}
        secondSignatureName={"Sakib Jisan"}
        secondSignatureDesignation={"Asia Steering Committee Chain"}
      /> 
  )
}
