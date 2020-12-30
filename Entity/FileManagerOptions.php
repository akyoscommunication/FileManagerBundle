<?php

namespace Akyos\FileManagerBundle\Entity;

use Akyos\FileManagerBundle\Repository\FileManagerOptionsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;

/**
 * @ORM\Entity(repositoryClass=FileManagerOptionsRepository::class)
 */
class FileManagerOptions
{
	use TimestampableEntity;
	
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity=PrivateSpace::class, mappedBy="fileManagerOptions", orphanRemoval=true, cascade={"persist"})
     */
    private $privateSpaces;

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
        if ($this->privateSpaces->removeElement($privateSpace)) {
            // set the owning side to null (unless already changed)
            if ($privateSpace->getFileManagerOptions() === $this) {
                $privateSpace->setFileManagerOptions(null);
            }
        }

        return $this;
    }
}
