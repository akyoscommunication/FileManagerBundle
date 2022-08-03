<?php

namespace Akyos\FileManagerBundle\Entity;

use Akyos\FileManagerBundle\Repository\FileManagerOptionsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;

#[ORM\Entity(repositoryClass: FileManagerOptionsRepository::class)]
class FileManagerOptions
{
    use TimestampableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\OneToMany(targetEntity: PrivateSpace::class, mappedBy: 'fileManagerOptions', orphanRemoval: true, cascade: ['persist'])]
    private $privateSpaces;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $publicTab;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $privateSpacesTab;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $securedTab;

    public function __construct()
    {
        $this->privateSpaces = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|PrivateSpace[]
     */
    public function getPrivateSpaces(): Collection
    {
        return $this->privateSpaces;
    }

    public function addPrivateSpace(PrivateSpace $privateSpace): self
    {
        if (!$this->privateSpaces->contains($privateSpace)) {
            $this->privateSpaces[] = $privateSpace;
            $privateSpace->setFileManagerOptions($this);
        }

        return $this;
    }

    public function removePrivateSpace(PrivateSpace $privateSpace): self
    {
        // set the owning side to null (unless already changed)
        if ($this->privateSpaces->removeElement($privateSpace) && $privateSpace->getFileManagerOptions() === $this) {
            $privateSpace->setFileManagerOptions(null);
        }

        return $this;
    }

    public function getPublicTab(): ?string
    {
        return $this->publicTab;
    }

    public function setPublicTab(?string $publicTab): self
    {
        $this->publicTab = $publicTab;

        return $this;
    }

    public function getPrivateSpacesTab(): ?string
    {
        return $this->privateSpacesTab;
    }

    public function setPrivateSpacesTab(?string $privateSpacesTab): self
    {
        $this->privateSpacesTab = $privateSpacesTab;

        return $this;
    }

    public function getSecuredTab(): ?string
    {
        return $this->securedTab;
    }

    public function setSecuredTab(?string $securedTab): self
    {
        $this->securedTab = $securedTab;

        return $this;
    }
}
